import express, { Request, Response } from 'express';
import { Project } from '../models/Project';

const router = express.Router();

// Save project data
router.post('/save', async (req: Request, res: Response) => {
  try {
    const { projectId, projectData } = req.body;
    
    const existingProject = await Project.findOne({ projectId });
    
    if (existingProject) {
      existingProject.projectData = projectData;
      existingProject.updatedAt = new Date();
      await existingProject.save();
      res.json({ success: true, message: 'Project updated successfully' });
    } else {
      const newProject = new Project({ projectId, projectData });
      await newProject.save();
      res.json({ success: true, message: 'Project saved successfully' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save project' });
  }
});

// Get project by ID
router.get('/:projectId', async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve project' });
  }
});

// List all projects
router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({}, 'projectId createdAt updatedAt');
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve projects' });
  }
});

export default router; 