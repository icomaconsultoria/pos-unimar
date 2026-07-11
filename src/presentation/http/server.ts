import express from 'express'
import cors from 'cors'
import { userRoutes } from './routes/userRoutes'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/users', userRoutes)

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API is running!' })
})

export { app }