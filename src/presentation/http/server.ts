import express from 'express'
import cors from 'cors'
import { userRoutes } from './routes/userRoutes'
import { taskRouter } from './routes/taskRoutes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/users', userRoutes)
app.use('/tasks', taskRouter)

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API is running!' })
})

export { app }