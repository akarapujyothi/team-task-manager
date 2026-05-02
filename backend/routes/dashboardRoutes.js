const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.get('/', async (req, res) => {
  const total = await Task.countDocuments()
  const completed = await Task.countDocuments({ status: 'completed' })
  const pending = await Task.countDocuments({ status: 'pending' })

  res.json({ total, completed, pending })
})

module.exports = router