const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Project = require('../models/Project');

const initialProjects = [
  {
    title: 'Library Management System',
    description: 'Desktop GUI application for managing library inventory, book issuing, member tracking, fine calculations, and database backups built with Python Tkinter and MySQL backend.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop',
    techStack: ['Python', 'Tkinter', 'MySQL', 'Pillow'],
    category: 'Python',
    githubLink: 'https://github.com/anuj-cs16/library-management-system',
    liveLink: '',
    featured: true,
  },
  {
    title: 'Pokémon-Journey',
    description: 'Interactive JavaScript-driven Pokémon browser RPG featuring animated tile movement, wild creature encounters, turn-based battle mechanics, and sound effects.',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=800&auto=format&fit=crop',
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Web Audio API'],
    category: 'Games',
    githubLink: 'https://github.com/anuj-cs16/pokemon-journey',
    liveLink: 'https://anuj-cs16.github.io/pokemon-journey',
    featured: true,
  },
  {
    title: 'Employee Management App',
    description: 'Modern single-page web app for tracking employee profiles, department roles, payroll breakdown, attendance status, and performance reports with local storage persistence.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    techStack: ['JavaScript', 'HTML5', 'Tailwind CSS', 'LocalStorage'],
    category: 'Web Apps',
    githubLink: 'https://github.com/anuj-cs16/employee-management',
    liveLink: '',
    featured: false,
  },
  {
    title: 'ERP Portal',
    description: 'Comprehensive enterprise resource planning portal featuring user role RBAC, attendance tracking, inventory management, student metrics, and PDF invoice generation.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
    techStack: ['Node.js', 'Express', 'EJS', 'MongoDB', 'Bootstrap'],
    category: 'Full-Stack',
    githubLink: 'https://github.com/anuj-cs16/erp-portal',
    liveLink: '',
    featured: true,
  },
  {
    title: 'Python Course & Utilities',
    description: 'Comprehensive suite of 50+ modular Python algorithms, data structure implementations, automation scripts, web scrapers, and GUI utility tools.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    techStack: ['Python', 'OOP', 'Data Structures', 'Automation'],
    category: 'Python',
    githubLink: 'https://github.com/anuj-cs16/python-course',
    liveLink: '',
    featured: false,
  },
];

const seedData = async (force = false) => {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0 || force) {
      if (force) await Project.deleteMany({});
      await Project.insertMany(initialProjects);
      console.log('[Database Seeder] Initial projects inserted successfully.');
    }

    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminEmail = process.env.ADMIN_EMAIL || 'anujdubey162005@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      await User.create({
        username: adminUsername,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`[Database Seeder] Default Admin user created (${adminEmail}).`);
    }
  } catch (error) {
    console.error('[Database Seeder Warning] Seeding failed or skipped:', error.message);
  }
};

module.exports = { seedData, initialProjects };
