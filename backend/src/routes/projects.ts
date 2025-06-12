import express, { Request, Response, Router, RequestHandler } from 'express';
import Project from '../models/Project';

const router: Router = express.Router();

// Save project data
router.post('/save', (async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId, projectData } = req.body;

    if (!projectId || !projectData) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: projectId and projectData'
      });
      return;
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
}) as RequestHandler);

// Get project by ID
router.get('/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching project with ID:', req.params.id);
    const project = await Project.findOne({ projectId: req.params.id });
    if (!project) {
      console.log('Project not found:', req.params.id);
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Error fetching project', error });
  }
}) as RequestHandler);

// Get all projects
router.get('/', (async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching all projects');
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects', error });
  }
}) as RequestHandler);

// Create new project
router.post('/', (async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Creating new project:', req.body);
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project', error });
  }
}) as RequestHandler);

// Update project
router.put('/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Updating project:', req.params.id);
    const project = await Project.findOneAndUpdate(
      { projectId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      console.log('Project not found for update:', req.params.id);
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project', error });
  }
}) as RequestHandler);

// Delete project
router.delete('/:id', (async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Deleting project:', req.params.id);
    const project = await Project.findOneAndDelete({ projectId: req.params.id });
    if (!project) {
      console.log('Project not found for deletion:', req.params.id);
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project', error });
  }
}) as RequestHandler);

export default router; 