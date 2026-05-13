"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { addComment } from "../actions";
import { getApiUrl } from "@/lib/api";

type Comment = {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
};

type Post = {
  _id: string;
  slug: string;
  title: string;
  comments?: Comment[];
};

type CommentActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialCommentState: CommentActionState = {
  status: "idle",
  message: "",
};

export default function PostCommentsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null | undefined>(undefined);
  const [commentState, setCommentState] = useState<CommentActionState>(initialCommentState);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const commentFormRef = useRef<HTMLFormElement>(null);

  const displayComments = post?.comments
    ? [...post.comments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    : [];

  const loadPost = async () => {
    try {
      const response = await fetch(getApiUrl(`/api/posts?t=${Date.now()}`), { cache: "no-store" });
      if (!response.ok) {
        setPost(null);
        return;
      }

      const data: Post[] = await response.json();
      const foundPost = data.find((p) => p.slug === slug);
      setPost(foundPost || null);
    } catch {
      setPost(null);
    }
  };

  useEffect(() => {
    loadPost();
  }, [slug]);

  const handleCommentSubmit = async (formData: FormData) => {
    const submittedName = String(formData.get("name") || "").trim();
    const submittedMessage = String(formData.get("message") || "").trim();
    setIsSubmittingComment(true);
    try {
      const result = await addComment(initialCommentState, formData);
      setCommentState(result);

      if (result.status === "success") {
        const clientComment: Comment = {
          _id: `temp-${Date.now()}`,
          name: submittedName,
          message: submittedMessage,
          createdAt: new Date().toISOString(),
        };

        setPost((prevPost) => {
          if (!prevPost) {
            return prevPost;
          }

          return {
            ...prevPost,
            comments: [clientComment, ...(prevPost.comments || [])],
          };
        });

        commentFormRef.current?.reset();
        await loadPost();
      }
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (post === undefined) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center animate-pulse">
        <div className="h-4 bg-stone-200 rounded w-1/4 mx-auto mb-8"></div>
        <div className="h-8 bg-stone-200 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-4 bg-stone-200 rounded w-1/2 mx-auto"></div>
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <p className="text-slate-600 mb-6">Post not found.</p>
        <Link href="/" className="text-slate-900 font-medium underline underline-offset-4">
          Back to all articles
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto">
      <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-10">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to article
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
          Comments
        </h1>
        <p className="text-slate-600">{post.title}</p>
      </div>

      <form ref={commentFormRef} action={handleCommentSubmit} className="space-y-4 bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8">
        <input type="hidden" name="postId" value={post._id} />
        <input type="hidden" name="slug" value={post.slug} />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
            Comment
          </label>
          <textarea
            id="message"
            name="message"
            required
            maxLength={1000}
            rows={4}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500 resize-y"
            placeholder="Share your thoughts..."
          />
        </div>

        {commentState.message ? (
          <p className={commentState.status === "error" ? "text-sm text-red-600" : "text-sm text-emerald-600"}>
            {commentState.message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmittingComment}
          className="inline-flex items-center justify-center bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmittingComment ? "Submitting..." : "Submit Comment"}
        </button>
      </form>

      <section className="border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">All Comments</h2>
        {displayComments.length === 0 ? (
          <p className="text-slate-500">No comments yet.</p>
        ) : (
          <div className="space-y-4">
            {displayComments.map((comment) => (
              <article key={String(comment.createdAt)} className="border border-slate-200 rounded-xl p-4 bg-white">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="font-semibold text-slate-900">{comment.name}</h3>
                  <time className="text-xs text-slate-500" dateTime={comment.createdAt}>
                    {new Date(comment.createdAt).toLocaleString()}
                  </time>
                </div>
                <p className="text-slate-700 whitespace-pre-wrap">{comment.message}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
