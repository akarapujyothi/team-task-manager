const express = require('express')
const router = express.Router()

const Project = require('../models/Project')

// TEMP: auth remove చేసి test చేద్దాం
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body)
    const saved = await project.save()
    res.json(saved)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  const projects = await Project.find()
  res.json(projects)
})

module.exports = router