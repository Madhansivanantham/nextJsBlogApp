"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import mongoose from "mongoose";

type CommentActionState = {
    status: "idle" | "success" | "error";
    message: string;
};

export async function addComment(
    _prevState: CommentActionState,
    formData: FormData
): Promise<CommentActionState> {
    const postId = String(formData.get("postId") || "").trim();
    const slug = String(formData.get("slug") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!postId || !slug) {
        return { status: "error", message: "Invalid post context." };
    }

    if (!name || !message) {
        return { status: "error", message: "Name and comment are required." };
    }

    if (name.length > 80) {
        return { status: "error", message: "Name must be 80 characters or less." };
    }

    if (message.length > 1000) {
        return { status: "error", message: "Comment must be 1000 characters or less." };
    }

    try {
        await connectDB();

        const commentPayload = {
            name,
            message,
            createdAt: new Date(),
        };

        let updateResult = null;
        if (mongoose.Types.ObjectId.isValid(postId)) {
            updateResult = await Post.updateOne(
                { _id: postId },
                { $push: { comments: commentPayload as any } }
            );
        }

        if (!updateResult || updateResult.modifiedCount === 0) {
            updateResult = await Post.updateOne(
                { slug },
                { $push: { comments: commentPayload as any } }
            );
        }

        if (!updateResult || updateResult.modifiedCount === 0) {
            return { status: "error", message: "Post not found or comment not saved." };
        }

        const updatedPost = await Post.findOne(
            mongoose.Types.ObjectId.isValid(postId)
                ? { _id: postId }
                : { slug }
        );

        if (!updatedPost) {
            return { status: "error", message: "Comment saved, but failed to reload post." };
        }

        revalidatePath(`/blog/${slug}`);
        return { status: "success", message: "Comment posted successfully." };
    } catch (error) {
        console.error("Error adding comment:", error);
        return {
            status: "error",
            message: "Something went wrong while saving your comment.",
        };
    }
}
