
import express from "express";

import {
  getUsers,
  getUserById,
  getUserTasks,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id/tasks", getUserTasks);
router.get("/:id", getUserById);

router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
