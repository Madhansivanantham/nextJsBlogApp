import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 80 },
        message: { type: String, required: true, trim: true, maxlength: 1000 },
        createdAt: { type: Date, default: Date.now },
    },
    { _id: true }
);

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    tag: { type: String, required: true },
    readTime: { type: String, required: true },
    image: {
        type: String,
        required: true,
        trim: true,
        default: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    comments: { type: [CommentSchema], default: [] },
}, { timestamps: true })

export default mongoose.models.Post || mongoose.model('Post', PostSchema)