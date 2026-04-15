"use client";

import { useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { addComment } from "./actions";

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
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tag: string;
  readTime: string;
  comments?: Comment[];
};

type PostWithMDX = Post & {
  mdxSource: MDXRemoteSerializeResult;
};

type CommentActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialCommentState: CommentActionState = {
  status: "idle",
  message: "",
};

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<PostWithMDX | null | undefined>(undefined);
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
      const response = await fetch(`/api/posts?t=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) {
        setPost(null);
        return;
      }

      const data: Post[] = await response.json();
      const foundPost = data.find((p) => p.slug === slug);

      if (foundPost) {
        const mdxSource = await serialize(foundPost.content);
        setPost({ ...foundPost, mdxSource });
      } else {
        setPost(null);
      }
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
    notFound();
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/posts?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Blog post deleted successfully!');
        window.location.href = '/';
      } else {
        const error = await response.json();
        alert(`Error deleting post: ${error.error}`);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post. Please try again.');
    }
  }

  return (
    <article className="max-w-2xl mx-auto group">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-10 group-hover:-translate-x-1 duration-300">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to all articles
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm font-medium text-slate-500 bg-slate-50 px-4 py-3 rounded-full w-fit">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-400 to-slate-600 flex items-center justify-center text-xs text-white font-bold">
              {post.author.charAt(0)}
            </div>
            <span className="text-slate-700">{post.author}</span>
          </div>
          <span className="opacity-50">•</span>
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
        </div>
      </div>

      <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed">
        <MDXRemote {...post.mdxSource} />
      </div>

      <section id="comments" className="mt-12 border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Comments</h2>

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

        {displayComments.length === 0 ? (
          <p className="text-slate-500">No comments yet. Be the first to comment.</p>
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
      <div className="flex justify-center">
        <button onClick={() => handleDelete(post._id)} className="bg-red-500 hover:bg-red-600 text-white my-10 px-4 py-2 rounded-md">
           Delete Blog
        </button>
      </div>
    </article>
  );
}