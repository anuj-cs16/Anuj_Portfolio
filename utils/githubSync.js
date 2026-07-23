const axios = require('axios');
const Project = require('../models/Project');

/**
 * Normalizes technology stack names to look polished.
 */
const techCaseMap = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  react: 'React',
  nodejs: 'Node.js',
  node: 'Node.js',
  express: 'Express',
  mongodb: 'MongoDB',
  mysql: 'MySQL',
  sqlite: 'SQLite',
  html: 'HTML5',
  css: 'CSS3',
  tailwind: 'Tailwind CSS',
  tailwindcss: 'Tailwind CSS',
  electron: 'Electron',
  bootstrap: 'Bootstrap',
  nextjs: 'Next.js',
  'next.js': 'Next.js',
  vue: 'Vue.js',
  angular: 'Angular',
  django: 'Django',
  flask: 'Flask',
  sqlite3: 'SQLite',
  postgres: 'PostgreSQL',
  postgresql: 'PostgreSQL',
  redis: 'Redis',
  docker: 'Docker',
  sass: 'Sass',
  scss: 'Sass',
};

/**
 * Capitalizes acronyms completely and formats titles from repo names.
 */
const formatTitle = (name) => {
  const uppercaseWords = ['pos', 'erp', 'api', 'db', 'gui', 'rpg', 'spa', 'mvc', 'jwt', 'cli', 'xml', 'json', 'url', 'sdk', 'ui'];
  return name
    .split(/[-_]+/)
    .map((word) => {
      const lower = word.toLowerCase();
      if (uppercaseWords.includes(lower)) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

/**
 * Determines project category based on language and topics.
 */
const determineCategory = (repo) => {
  const nameLower = repo.name.toLowerCase();
  const descLower = (repo.description || '').toLowerCase();
  const topics = (repo.topics || []).map((t) => t.toLowerCase());
  const lang = (repo.language || '').toLowerCase();

  if (lang === 'python') return 'Python';
  
  if (
    nameLower.includes('game') ||
    descLower.includes('game') ||
    topics.includes('game') ||
    topics.includes('gamedev') ||
    nameLower.includes('pokemon')
  ) {
    return 'Games';
  }

  const fullStackKeywords = [
    'fullstack',
    'full-stack',
    'mern',
    'mean',
    'nextjs',
    'express',
    'mongodb',
    'django',
    'laravel',
    'postgres',
    'mysql',
    'sqlite',
    'database',
  ];
  const hasFullStackTopic = topics.some((t) => fullStackKeywords.includes(t));
  const hasFullStackDesc = fullStackKeywords.some((k) => descLower.includes(k));
  
  if (hasFullStackTopic || hasFullStackDesc) {
    return 'Full-Stack';
  }

  return 'Web Apps';
};

/**
 * Maps categories to polished Unsplash covers.
 */
const getCategoryImage = (category) => {
  switch (category) {
    case 'Python':
      return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop';
    case 'Games':
      return 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=800&auto=format&fit=crop';
    case 'Full-Stack':
      return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop';
    case 'Web Apps':
    default:
      return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop';
  }
};

/**
 * Main function to synchronize GitHub repositories to MongoDB.
 */
const syncGitHubRepos = async () => {
  const username = process.env.GITHUB_USERNAME || 'anuj-cs16';
  const token = process.env.GITHUB_TOKEN;

  console.log(`[GitHub Sync] Starting sync for user: ${username}...`);

  const headers = {
    'User-Agent': 'Anuj-Dubey-Portfolio-Sync',
  };

  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  // Fetch repositories from GitHub
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=created&direction=desc`,
    { headers }
  );

  const repos = response.data;
  if (!Array.isArray(repos)) {
    throw new Error('Invalid response format from GitHub API');
  }

  // Filter out forks
  const originalRepos = repos.filter((repo) => !repo.fork);
  console.log(`[GitHub Sync] Found ${originalRepos.length} original public repositories.`);

  // Get existing projects in MongoDB to avoid duplicates
  let existingLinks = new Set();
  try {
    const existingProjects = await Project.find({}, 'githubLink');
    existingLinks = new Set(
      existingProjects.map((p) => (p.githubLink || '').toLowerCase().trim())
    );
  } catch (err) {
    console.warn('[GitHub Sync Warning] Could not fetch existing projects from MongoDB, defaulting to empty database:', err.message);
  }

  const newProjectsToInsert = [];

  for (const repo of originalRepos) {
    const repoUrl = (repo.html_url || '').toLowerCase().trim();
    if (existingLinks.has(repoUrl)) {
      continue;
    }

    const title = formatTitle(repo.name);
    const category = determineCategory(repo);
    const image = getCategoryImage(category);

    // Build tech stack list from primary language and topics
    const rawTech = [];
    if (repo.language) rawTech.push(repo.language);
    if (Array.isArray(repo.topics)) rawTech.push(...repo.topics);

    const techStack = [
      ...new Set(
        rawTech
          .map((t) => t.toLowerCase().trim())
          .map((t) => techCaseMap[t] || t.charAt(0).toUpperCase() + t.slice(1))
          .filter(Boolean)
      ),
    ];

    newProjectsToInsert.push({
      title,
      description: repo.description || 'Auto-synced repository from GitHub.',
      image,
      techStack,
      category,
      githubLink: repo.html_url,
      liveLink: repo.homepage || '',
      featured: true,
    });
  }

  let insertedCount = 0;
  if (newProjectsToInsert.length > 0) {
    try {
      const results = await Project.insertMany(newProjectsToInsert);
      insertedCount = results.length;
      console.log(`[GitHub Sync] Synced ${insertedCount} new projects successfully.`);
    } catch (dbErr) {
      console.error('[GitHub Sync Error] Failed to insert new projects into database:', dbErr.message);
      throw dbErr;
    }
  } else {
    console.log('[GitHub Sync] No new repositories to import.');
  }

  return {
    totalReposFound: originalRepos.length,
    newProjectsSynced: insertedCount,
    skippedDuplicates: originalRepos.length - newProjectsToInsert.length,
  };
};

module.exports = { syncGitHubRepos };
