import express from 'express';
import Like from '../models/Likes.js';
import Comment from '../models/Comments.js';
import { databases } from '../config/appwrite.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Toggle like
router.post('/toggle', authenticateUser, async (req, res) => {
  try {
    const { targetType, targetId } = req.body;
    const userId = req.user.id;

    const existingLike = await Like.findOne({ userId, targetType, targetId });
    if (existingLike) {
      await existingLike.deleteOne();
      if (targetType === 'comment') {
        await Comment.findByIdAndUpdate(targetId, { $pull: { likes: { userId } } });
      } else if (targetType === 'post') {
        const post = await databases.getDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_COLLECTION_ID,
          targetId
        );
        const updatedLikes = (post.likes || []).filter(id => id !== userId);
        await databases.updateDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_COLLECTION_ID,
          targetId,
          { likes: updatedLikes }
        );
      }
      res.json({ liked: false, message: 'Unliked successfully' });
    } else {
      await Like.create({ userId, targetType, targetId });
      if (targetType === 'comment') {
        await Comment.findByIdAndUpdate(targetId, { $push: { likes: { userId, createdAt: new Date() } } });
      } else if (targetType === 'post') {
        const post = await databases.getDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_COLLECTION_ID,
          targetId
        );
        const updatedLikes = [...(post.likes || []), userId];
        await databases.updateDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_COLLECTION_ID,
          targetId,
          { likes: updatedLikes }
        );
      }
      res.json({ liked: true, message: 'Liked successfully' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
