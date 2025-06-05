import express from 'express';
import Project from '../models/Project';

const router = express.Router();

// Save project data
router.post('/save', async (req, res) => {
  try {
    const { projectId, projectData } = req.body;

    if (!projectId || !projectData) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: projectId and projectData'
      });
    }

    // Update or create project
    const project = await Project.findOneAndUpdate(
      { projectId },
      {
        projectId,
        projectData,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error saving project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save project data'
    });
  }
});

// Get project by ID
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findOne({ projectId });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project data'
    });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ updatedAt: -1 });
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects'
    });
  }
});

export default router; 