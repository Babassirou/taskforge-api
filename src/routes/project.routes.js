
import express from "express";

import {
  getProjects,
  getProjectById,
  getProjectTasks,
  getProjectSummary,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/project.controller.js";

const router = express.Router();

// GET routes
router.get("/", getProjects);
router.get("/:id/tasks", getProjectTasks);
router.get("/:id/summary", getProjectSummary);
router.get("/:id", getProjectById);

// POST route
router.post("/", createProject);


// PATCH route
router.patch("/:id", updateProject);

// DELETE route
router.delete("/:id", deleteProject);

export default router;
