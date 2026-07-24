const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  techStack: [String],
  category: String,
  githubLink: String,
  liveLink: String,
  featured: Boolean,
});

const Project = mongoose.model('Project', ProjectSchema);

const getProjectImage = (title, category) => {
  const t = (title || '').toLowerCase();
  if (t.includes('blood') || t.includes('donation') || t.includes('health') || t.includes('medical')) {
    return 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800&auto=format&fit=crop';
  }
  if (t.includes('pokemon') || t.includes('pokimon') || t.includes('game') || t.includes('rpg') || t.includes('arcade')) {
    return 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?q=80&w=800&auto=format&fit=crop';
  }
  if (t.includes('library') || t.includes('book') || t.includes('shelf')) {
    return 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop';
  }
  if (t.includes('employee') || t.includes('payroll') || t.includes('attendance') || t.includes('hr')) {
    return 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop';
  }
  if (t.includes('erp') || t.includes('portal') || t.includes('enterprise') || t.includes('billing') || t.includes('dashboard')) {
    return 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop';
  }
  if (t.includes('portfolio') || t.includes('personal') || t.includes('website') || t.includes('cv')) {
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop';
  }
  if (t.includes('python') || t.includes('script') || t.includes('algorithm') || t.includes('utilities')) {
    return 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop';
  }
  
  // Category defaults
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

async function run() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/anuj_portfolio';
  console.log('[Migration] Connecting to:', uri);
  await mongoose.connect(uri);

  // 1. Delete portfolio projects
  const deleteResult = await Project.deleteMany({
    $or: [
      { title: /portfolio/i },
      { githubLink: /portfolio/i }
    ]
  });
  console.log(`[Migration] Deleted ${deleteResult.deletedCount} portfolio-related projects.`);

  // 2. Fetch and update other projects
  const projects = await Project.find({});
  console.log(`[Migration] Processing ${projects.length} remaining projects for image updates...`);

  let updatedCount = 0;
  for (const project of projects) {
    const correctImage = getProjectImage(project.title, project.category);
    if (project.image !== correctImage) {
      project.image = correctImage;
      await project.save();
      console.log(`[Migration] Updated image for "${project.title}" to: ${correctImage}`);
      updatedCount++;
    }
  }

  console.log(`[Migration] Finished. Updated ${updatedCount} project images.`);
  await mongoose.disconnect();
}

run().catch(err => {
  console.error('[Migration Error]', err);
  process.exit(1);
});
