
import { tasks, projects, users } from "../data/data.js";

const allowedStatuses = ["todo", "in-progress", "done"];
const allowedPriorities = ["low", "medium", "high"];

// GET all tasks, with optional filters
export const getTasks = (req, res) => {
  const { status, priority, projectId, assignedTo, search } = req.query;

  let result = tasks;

  if (status) {
    result = result.filter(task => task.status === status);
  }

  if (priority) {
    result = result.filter(task => task.priority === priority);
  }

  if (projectId) {
    result = result.filter(task => task.projectId === Number(projectId));
  }

  if (assignedTo) {
    result = result.filter(task => task.assignedTo === Number(assignedTo));
  }

  if (search) {
    result = result.filter(task =>
      `${task.title} ${task.description || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  res.status(200).json(result);
};

// GET one task
export const getTaskById = (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.status(200).json(task);
};

// POST create task
export const createTask = (req, res) => {
  const { title, description, projectId, assignedTo, priority } = req.body;

  if (!title || projectId === undefined || !priority) {
    return res.status(400).json({
      message: "title, projectId and priority are required"
    });
  }

  if (!allowedPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority must be low, medium or high"
    });
  }

  const project = projects.find(project => project.id === Number(projectId));

  if (!project) {
    return res.status(400).json({
      message: "Project does not exist"
    });
  }

  if (assignedTo !== undefined && assignedTo !== null) {
    const user = users.find(user => user.id === Number(assignedTo));

    if (!user) {
      return res.status(400).json({
        message: "Assigned user does not exist"
      });
    }
  }

  const newTask = {
    id: Math.max(0, ...tasks.map(task => task.id)) + 1,
    title,
    description: description || "",
    projectId: Number(projectId),
    ...(assignedTo !== undefined && assignedTo !== null
      ? { assignedTo: Number(assignedTo) }
      : {}),
    priority,
    status: "todo"
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

// PATCH update task
export const updateTask = (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const { title, description, projectId, assignedTo, priority, status } = req.body;

  if (projectId !== undefined) {
    const project = projects.find(project => project.id === Number(projectId));

    if (!project) {
      return res.status(400).json({
        message: "Project does not exist"
      });
    }
  }

  if (assignedTo !== undefined && assignedTo !== null) {
    const user = users.find(user => user.id === Number(assignedTo));

    if (!user) {
      return res.status(400).json({
        message: "Assigned user does not exist"
      });
    }
  }

  if (priority !== undefined && !allowedPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Priority must be low, medium or high"
    });
  }

  if (status !== undefined && !allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Status must be todo, in-progress or done"
    });
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (projectId !== undefined) task.projectId = Number(projectId);

  if (assignedTo !== undefined) {
    if (assignedTo === null) {
      delete task.assignedTo;
    } else {
      task.assignedTo = Number(assignedTo);
    }
  }

  if (priority !== undefined) task.priority = priority;
  if (status !== undefined) task.status = status;

  res.status(200).json(task);
};

// DELETE task
export const deleteTask = (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const deletedTask = tasks.splice(index, 1);

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask[0]
  });
};
