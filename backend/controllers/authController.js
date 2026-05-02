const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: "Email already exists" })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email,
      password: hashed,
      role
    })

    await user.save()

    res.json({ message: "User created" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).json({ message: "Wrong password" })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey",
      { expiresIn: "1d" }
    )

    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}