
import { users, tasks } from "../data/data.js";

// GET all users with optional filtering
export const getUsers = (req, res) => {
  const { role, active } = req.query;

  let result = users;

  if (role) {
    result = result.filter(user => user.role === role);
  }

  if (active !== undefined) {
    result = result.filter(
      user => user.active === (active === "true")
    );
  }

  res.status(200).json(result);
};

// GET one user
export const getUserById = (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json(user);
};

// GET tasks assigned to a user
export const getUserTasks = (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const userTasks = tasks.filter(task => task.assignedTo === id);

  res.status(200).json(userTasks);
};

// POST create a user
export const createUser = (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      message: "Name, email and role are required"
    });
  }

  const emailExists = users.some(
    user => user.email.toLowerCase() === email.toLowerCase()
  );

  if (emailExists) {
    return res.status(409).json({
      message: "Email already exists"
    });
  }

  const newUser = {
    id: Math.max(0, ...users.map(user => user.id)) + 1,
    name,
    email,
    role,
    active: true
  };

  users.push(newUser);

  res.status(201).json(newUser);
};

// PATCH update a user
export const updateUser = (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const { name, email, role, active } = req.body;

  if (email) {
    const emailExists = users.some(
      existingUser =>
        existingUser.email.toLowerCase() === email.toLowerCase() &&
        existingUser.id !== id
    );

    if (emailExists) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }
  }

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (role !== undefined) user.role = role;
  if (active !== undefined) user.active = active;

  res.status(200).json(user);
};

// DELETE a user
export const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex(user => user.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const deletedUser = users.splice(index, 1);

  res.status(200).json({
    message: "User deleted successfully",
    user: deletedUser[0]
  });
};
