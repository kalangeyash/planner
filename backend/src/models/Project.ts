import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  roadmap: { type: Object },
  architecture: { type: Object },
  timeline: { type: Object },
  techStack: { type: Object },
  costs: { type: Object },
  team: { type: Object },
  risks: { type: Object },
  resources: { type: Object },
  dependencies: { type: Object },
  documentation: { type: Object },
  health: { type: Object },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
projectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Project = mongoose.model('Project', projectSchema); 