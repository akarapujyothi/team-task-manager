require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/authRoutes')

app.use('/api/auth', authRoutes)

const projectRoutes = require('./routes/projectRoutes')
app.use('/api/projects', projectRoutes)

const userRoutes = require('./routes/userRoutes')

app.use('/api/users', userRoutes)

const dashboardRoutes = require('./routes/dashboardRoutes')
app.use('/api/dashboard', dashboardRoutes)

// ✅ ADD THIS
const taskRoutes = require('./routes/taskRoutes')
app.use('/api/tasks', taskRoutes)

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`)
})