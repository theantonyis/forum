import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    discussion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discussion",
        required: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Post", postSchema);
