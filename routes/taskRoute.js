const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, due_date, category, priority } = req.body;
    const newTask = new Task({ title, description, due_date, category, priority });
    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, category, priority } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description, due_date, category, priority });
    res.json({ message: 'Task updated successfully', updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Mark a task as completed
router.put('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const completedTask = await Task.findByIdAndUpdate(id, { completed: true });
    res.json({ message: 'Task marked as completed',  completedTask});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
