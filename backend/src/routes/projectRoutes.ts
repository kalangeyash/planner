import express, { Router, Request, Response } from 'express';
import { Project } from '../models/Project';
import { RequestHandler, RequestHandlerWithParams } from '../types/express';

const router: Router = express.Router();

// Get all projects
const getAllProjects: RequestHandler = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// Get a single project
const getProject: RequestHandlerWithParams<{ id: string }> = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error });
  }
};

// Create a new project
const createProject: RequestHandler = async (req: Request, res: Response) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error });
  }
};

// Update a project
const updateProject: RequestHandlerWithParams<{ id: string }> = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: 'Error updating project', error });
  }
};

// Delete a project
const deleteProject: RequestHandlerWithParams<{ id: string }> = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};

// Register routes
router.get('/', getAllProjects);
router.get('/:id', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router; 