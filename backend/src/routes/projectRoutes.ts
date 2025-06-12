import express, { Router, Request, Response, RequestHandler } from 'express';
import Project from '../models/Project.js';

interface ProjectRequest extends Request {
  params: {
    projectId: string;
  };
}

export const router: Router = express.Router();

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
const getProject: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findOne({ projectId: req.params.projectId });
    if (!project) {
      res.status(404).json({ success: false, error: 'Project not found' });
      return;
    }
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve project' });
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
const updateProject: RequestHandler = async (req: Request, res: Response) => {
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
const deleteProject: RequestHandler = async (req: Request, res: Response) => {
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

// Save project data
const saveProject: RequestHandler = async (req: Request, res: Response) => {
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
};

// List all projects
const listProjects: RequestHandler = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({}, 'projectId createdAt updatedAt');
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve projects' });
  }
};

// Register routes
router.get('/', getAllProjects);
router.get('/:projectId', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.post('/save', saveProject);
router.get('/', listProjects);

export default router;
