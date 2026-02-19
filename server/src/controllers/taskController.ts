import { Response } from "express";
import Task from "../models/task";
import { AuthRequest } from "../middleware/authMiddleware";

// @desc    Get all tasks
// @route   GET /api/tasks
export const getTasks = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    // FIX: Added parenthesis ( and filtered by user
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
export const createTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { title, description, priority, dueDate } = req.body;

    const newTask = await Task.create({
      title,
      description,
      priority,
      dueDate,
      user: req.user.id, // Attach the logged-in user's ID
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
export const updateTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    // SECURITY FIX: Use findOneAndUpdate with BOTH _id and user
    // This ensures User A cannot update User B's task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id }, // <--- Check ownership here
      req.body,
      { new: true },
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found or not authorized" });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    // SECURITY FIX: Use findOneAndDelete with BOTH _id and user
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

    if (!task) {
      res.status(404).json({ message: "Task not found or not authorized" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
