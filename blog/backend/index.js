import dotenv from 'dotenv/config.js'
import express from 'express'
import cors from 'cors'
import userRoutes from './routes/comment.js'
import bookmarkRouter from './routes/bookmark.js'
import { connectDB } from './config/db.js'
import commentsRouter from './routes/comment.js';
import likesRouter from './routes/like.js';
import followRouter from './routes/follow.js'
const app = express();

await connectDB();

// CORS configuration
const allowedOrigins = [
  'https://blogger-lgfc.vercel.app', // Frontend domain
  'https://blogger-lbcd.vercel.app', // Backend domain (if needed)
  'http://localhost:5173',           // Local development
  'http://localhost:3000'            // Local backend
];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('CORS blocked origin:', origin);
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Middleware
app.use(express.json())

// Prefix all user routes with /api
app.use('/api/comments', commentsRouter);
app.use('/api/likes', likesRouter);
app.use('/api/bookmarks',bookmarkRouter)
app.use('/api/follow',followRouter)
// Routes
app.get('/', (req, res) => {
    res.send('server is ready')
})

const port = process.env.PORT||3000

if(process.env.NODE_ENV!=="production"){
    app.listen(port,()=>{
        console.log(`server at http://localhost:${port}`)
    })
}

// for vercel
export default app