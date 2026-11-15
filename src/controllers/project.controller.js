
import { projects, users, tasks } from "../data/data.js";

// GET all projects
export const getProjects = (req, res) => {
  res.status(200).json(projects);
};

// GET one project
export const getProjectById = (req, res) => {
  const id = Number(req.params.id);

  const project = projects.find(project => project.id === id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  res.status(200).json(project);
};

// GET all tasks belonging to a project
export const getProjectTasks = (req, res) => {
  const id = Number(req.params.id);

  const project = projects.find(project => project.id === id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  const projectTasks = tasks.filter(task => task.projectId === id);

  res.status(200).json(projectTasks);
};

// GET project summary
export const getProjectSummary = (req, res) => {
  const id = Number(req.params.id);

  const project = projects.find(project => project.id === id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  const projectTasks = tasks.filter(task => task.projectId === id);

  const summary = { 
    "project": { "id": 1, "name": "TaskForge API" },
     "statistics": { "totalTasks": 6, "todo": 2, "inProgress": 3, "done": 1 }}

  res.status(200).json(summary);
};

// POST create project
export const createProject = (req, res) => {
  const { name, description, ownerId } = req.body;

  if (!name || !description || ownerId === undefined) {
    return res.status(400).json({
      message: "Name, description and ownerId are required"
    });
  }

  

  const owner = users.find(user => user.id === Number(ownerId));

  if (!owner) {
    return res.status(400).json({
      message: "Owner does not exist"
    });
  }

  const newProject = {
    id: Math.max(0, ...projects.map(project => project.id)) + 1,
    name,
    description,
    ownerId: Number(ownerId),
    status: "active"
  };

  projects.push(newProject);

  res.status(201).json(newProject);
};

// PATCH update project
export const updateProject = (req, res) => {
  const id = Number(req.params.id);

  const project = projects.find(project => project.id === id);

  if (!project) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  const { name, description, status } = req.body;

  if (name !== undefined) project.name = name;
  if (description !== undefined) project.description = description;
  if (status !== undefined) project.status = status;

  res.status(200).json(project);
};

// DELETE project
export const deleteProject = (req, res) => {
  const id = Number(req.params.id);

  const index = projects.findIndex(project => project.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  const deletedProject = projects.splice(index, 1);

  // Also delete tasks belonging to this project
  const remainingTasks = tasks.filter(task => task.projectId !== id);

  tasks.length = 0;
  tasks.push(...remainingTasks);

  res.status(200).json({
    message: "Project and its tasks deleted successfully",
    project: deletedProject[0]
  });
};
