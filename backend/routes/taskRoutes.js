const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body)
    const saved = await task.save()
    res.json(saved)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET all tasks with details
router.get('/', async (req, res) => {
  const tasks = await Task.find()
    .populate('project', 'name')
    .populate('assignedTo', 'name email')

  res.json(tasks)
})

module.exports = router