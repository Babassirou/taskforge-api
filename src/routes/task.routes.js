
import express from "express";

import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

// GET routes
router.get("/", getTasks);
router.get("/:id", getTaskById);

// POST route
router.post("/", createTask);

// PATCH route
router.patch("/:id", updateTask);

// DELETE route
router.delete("/:id", deleteTask);

export default router;
