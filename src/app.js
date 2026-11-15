
import express from "express";

import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";

import { logger } from "./middleware/logger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());

// Request logger
app.use(logger);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "TaskForge API is running"
  });
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// Centralized error handling
app.use(errorHandler);

export default app;
