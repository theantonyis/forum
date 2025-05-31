import express from "express";
import Discussion from "../models/Discussion.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE DISCUSSION
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description } = req.body;

        const newDiscussion = new Discussion({
            title,
            description,
            author: req.user,
        });

        await newDiscussion.save();
        res.status(201).json(newDiscussion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET ALL DISCUSSIONS
router.get("/", authMiddleware, async (req, res) => {
    try {
        const discussions = await Discussion.find().populate("author", "username").sort({ createdAt: -1 });
        res.json(discussions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET SINGLE DISCUSSION BY ID
router.get("/:id", async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id).populate("author", "username");
        if (!discussion) return res.status(404).json({ message: "Discussion not found" });
        res.json(discussion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
