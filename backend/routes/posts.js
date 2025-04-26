import express from "express";
import Post from "../models/Post.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE POST (COMMENT)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { discussionId, content } = req.body;

        const newPost = new Post({
            discussion: discussionId,
            content,
            author: req.user,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET ALL POSTS FOR A DISCUSSION
router.get("/:discussionId", async (req, res) => {
    try {
        const posts = await Post.find({ discussion: req.params.discussionId })
            .populate("author", "username")
            .sort({ createdAt: 1 });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
