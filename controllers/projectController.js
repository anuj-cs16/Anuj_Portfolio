const Project = require('../models/Project');
const { initialProjects } = require('../utils/seeder');

// Memory cache fallback in case MongoDB is unavailable
let memoryProjects = [...initialProjects.map((p, idx) => ({
  ...p,
  image: p.title === 'Flashbill POS' ? '/flashbill-pos.png' : p.image,
  _id: `fallback-${idx + 1}`
}))];

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    if (projects.length === 0) {
      return res.json(memoryProjects);
    }
    res.json(projects);
  } catch (error) {
    console.warn('[Project Controller] MongoDB error, returning in-memory seed projects:', error.message);
    res.json(memoryProjects);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      const fallback = memoryProjects.find(p => p._id === req.params.id);
      if (fallback) return res.json(fallback);
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    const fallback = memoryProjects.find(p => p._id === req.params.id);
    if (fallback) return res.json(fallback);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
  try {
    const { title, description, image, techStack, category, githubLink, liveLink, featured } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
      const newProject = await Project.create({
        title,
        description,
        image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
        techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(s => s.trim()) : []),
        category: category || 'Full-Stack',
        githubLink: githubLink || 'https://github.com/anuj-cs16',
        liveLink: liveLink || '',
        featured: featured ?? true,
      });

      memoryProjects.unshift(newProject);
      res.status(201).json(newProject);
    } catch (dbErr) {
      // Memory fallback if DB offline
      const mockProject = {
        _id: `mem-${Date.now()}`,
        title,
        description,
        image: image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
        techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(',').map(s => s.trim()) : []),
        category: category || 'Full-Stack',
        githubLink: githubLink || 'https://github.com/anuj-cs16',
        liveLink: liveLink || '',
        featured: featured ?? true,
        createdAt: new Date().toISOString(),
      };
      memoryProjects.unshift(mockProject);
      res.status(201).json(mockProject);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res) => {
  try {
    try {
      const project = await Project.findById(req.params.id);
      if (project) {
        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;
        project.image = req.body.image || project.image;
        if (req.body.techStack) {
          project.techStack = Array.isArray(req.body.techStack)
            ? req.body.techStack
            : req.body.techStack.split(',').map(s => s.trim());
        }
        project.category = req.body.category || project.category;
        project.githubLink = req.body.githubLink ?? project.githubLink;
        project.liveLink = req.body.liveLink ?? project.liveLink;
        if (req.body.featured !== undefined) project.featured = req.body.featured;

        const updatedProject = await project.save();
        return res.json(updatedProject);
      }
    } catch (dbErr) {
      // Continue to memory fallback
    }

    const index = memoryProjects.findIndex(p => p._id === req.params.id);
    if (index !== -1) {
      memoryProjects[index] = {
        ...memoryProjects[index],
        ...req.body,
        techStack: Array.isArray(req.body.techStack)
          ? req.body.techStack
          : req.body.techStack
          ? req.body.techStack.split(',').map(s => s.trim())
          : memoryProjects[index].techStack,
      };
      return res.json(memoryProjects[index]);
    }

    res.status(404).json({ message: 'Project not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res) => {
  try {
    try {
      const project = await Project.findById(req.params.id);
      if (project) {
        await project.deleteOne();
        memoryProjects = memoryProjects.filter(p => p._id !== req.params.id);
        return res.json({ message: 'Project removed successfully' });
      }
    } catch (dbErr) {
      // Continue to memory check
    }

    const initialLen = memoryProjects.length;
    memoryProjects = memoryProjects.filter(p => p._id !== req.params.id);
    if (memoryProjects.length < initialLen) {
      return res.json({ message: 'Project removed successfully' });
    }

    res.status(404).json({ message: 'Project not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
