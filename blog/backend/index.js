import dotenv from 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import userRoutes from './routes/comment.js'

import { connectDB } from './config/db.js'
import commentsRouter from './routes/comment.js';
import likesRouter from './routes/like.js';



const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173', // your frontend URL
    methods: ['GET', 'POST']
  }
});

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

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  // Listen for custom events here (e.g., new comment, like toggled)
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

if(process.env.NODE_ENV!=="production"){
    server.listen(port,()=>{
        console.log(`server at http://localhost:${port}`)
    })
}

// for vercel
export default app

export { io };