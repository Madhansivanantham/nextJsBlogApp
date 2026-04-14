import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    tag: { type: String, required: true },
    readTime: { type: String, required: true },
}, { timestamps: true })

export default mongoose.models.Post || mongoose.model('Post', PostSchema)