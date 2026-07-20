const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    image: {
      type: String,
      default: '',
    },
    techStack: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: 'Full-Stack',
    },
    githubLink: {
      type: String,
      default: 'https://github.com/anuj-cs16',
    },
    liveLink: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
