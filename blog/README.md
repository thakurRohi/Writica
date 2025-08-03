# 🎯 Placement Experience Hub

A minimalistic platform designed for college students to share and discover placement interview experiences. Connect with peers, learn from real interview stories, and prepare for your dream job with authentic insights from successful candidates.

## ✨ Features

### 🔐 Authentication & User Management
- User registration and login with Appwrite
- Profile management with avatar upload
- Session management with Redux persistence
- Protected routes with authentication guards

### 📝 Blog Post Management
- Create, edit, and delete blog posts
- Rich text editor (TinyMCE) for content creation
- Post categorization and tagging
- Draft and publish functionality
- Image upload and management

### 💬 Social Features
- Like and unlike posts
- Comment system with real-time updates
- Follow/unfollow other users
- Bookmark posts for later reading
- User profiles with follower counts

### 🔍 Search & Discovery
- Search posts by title, content, and tags
- User search functionality
- Browse all posts with pagination
- Filter posts by categories

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Dark/light theme support
- Mobile-first approach
- Loading states and error boundaries

### 🚀 Performance & Optimization
- Lazy loading of components
- Optimized image handling
- Redux state management
- Efficient routing with React Router

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **TinyMCE** - Rich text editor
- **React Hook Form** - Form handling
- **React Icons** - Icon library
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Authentication & Storage
- **Appwrite** - Backend-as-a-Service
- **Appwrite SDK** - Client and server SDKs

### Development Tools
- **ESLint** - Code linting
- **nodemon** - Development server
- **Vercel** - Deployment platform

## 📁 Project Structure

```
blog/
├── backend/                 # Node.js backend server
│   ├── config/             # Database and Appwrite configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   └── index.js           # Server entry point
│
└── blogger/               # React frontend application
    ├── src/
    │   ├── appwrite/      # Appwrite configuration and services
    │   ├── Components/     # Reusable UI components
    │   ├── pages/         # Page components
    │   ├── store/         # Redux store and slices
    │   ├── hooks/         # Custom React hooks
    │   └── utils/         # Utility functions
    ├── public/            # Static assets
    └── package.json       # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database
- Appwrite account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   APPWRITE_ENDPOINT=your_appwrite_endpoint
   APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_API_KEY=your_api_key
   PORT=3000
   ```

4. **Set up the frontend**
   ```bash
   cd ../blogger
   npm install
   ```

5. **Configure Appwrite**
   - Create an Appwrite project
   - Set up authentication methods
   - Configure database collections
   - Update the configuration in `src/appwrite/config.js`

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd blogger
   npm run dev
   ```
   The application will run on `http://localhost:5173`

## 📚 API Endpoints

### Comments
- `GET /api/comments/:postId` - Get comments for a post
- `POST /api/comments` - Create a new comment
- `DELETE /api/comments/:commentId` - Delete a comment

### Likes
- `GET /api/likes/:postId` - Get likes for a post
- `POST /api/likes` - Like a post
- `DELETE /api/likes/:postId` - Unlike a post

### Bookmarks
- `GET /api/bookmarks/:userId` - Get user bookmarks
- `POST /api/bookmarks` - Add bookmark
- `DELETE /api/bookmarks/:postId` - Remove bookmark

### Follows
- `GET /api/follow/:userId` - Get user followers/following
- `POST /api/follow` - Follow a user
- `DELETE /api/follow/:userId` - Unfollow a user

## 🎯 Key Features Implementation

### Authentication Flow
- Uses Appwrite for secure authentication
- JWT token management
- Protected routes with React Router
- Redux state persistence

### Real-time Features
- Socket.io integration for live updates
- Real-time comments and likes
- Live follower notifications

### File Upload
- Image upload to Appwrite storage
- File validation and optimization
- Progress tracking

### State Management
- Redux Toolkit for global state
- Separate slices for auth, posts, comments
- Optimistic updates for better UX

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Set environment variables in Vercel dashboard

### Backend (Vercel)
1. Deploy the backend folder to Vercel
2. Configure environment variables
3. Set up MongoDB Atlas for production database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Learning Outcomes

This project demonstrates:

- **Full-stack development** with modern JavaScript
- **Authentication and authorization** best practices
- **Real-time features** implementation
- **State management** with Redux
- **Responsive design** with Tailwind CSS
- **API design** and RESTful principles
- **Database modeling** with MongoDB
- **Deployment** strategies for full-stack applications

## 🐛 Troubleshooting

### Common Issues

1. **CORS errors**: Ensure backend CORS configuration matches frontend URL
2. **Authentication issues**: Check Appwrite configuration and API keys
3. **Database connection**: Verify MongoDB connection string
4. **Build errors**: Clear node_modules and reinstall dependencies

### Development Tips

- Use Redux DevTools for state debugging
- Enable ESLint for code quality
- Test API endpoints with Postman
- Monitor network requests in browser DevTools

## 📄 License

This project is created for educational purposes. Feel free to use and modify as needed.

## 👨‍💻 Author

Created as a student project to learn modern web development technologies and best practices.

---

**Happy Coding! 🚀** 