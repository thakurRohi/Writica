import dotenv from 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/comment.js'

import { connectDB } from './config/db.js'
import commentsRouter from './routes/comment.js';
import likesRouter from './routes/like.js';


const app = express();

 await connectDB();

// Middleware
app.use(cors())
app.use(express.json())


// Prefix all user routes with /api
app.use('/api/comments', commentsRouter);
app.use('/api/likes', likesRouter);

// Routes
app.get('/', (req, res) => {
    res.send('server is ready')
})



const port = process.env.PORT||3000


app.listen(port,()=>{
    console.log(`server at http://localhost:${port}`)
})