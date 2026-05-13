"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { getApiUrl } from '@/lib/api';

const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMTYgOSI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjkiIGZpbGw9IiNkM2Q1ZTEiLz48L3N2Zz4=';

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
  image?: string;
  comments?: Comment[];
};

type PostWithMDX = Post & {
  mdxSource: MDXRemoteSerializeResult;
};

interface PostPageClientProps {
  initialPost?: Post;
}

export function PostPageClient({ initialPost }: PostPageClientProps) {
  const [post, setPost] = useState<PostWithMDX | null | undefined>(initialPost ? undefined : null);
  const [isLoading, setIsLoading] = useState(!initialPost);

  useEffect(() => {
    if (initialPost) {
      const initializePost = async () => {
        try {
          const mdxSource = await serialize(initialPost.content);
          setPost({ ...initialPost, mdxSource });
          setIsLoading(false);
        } catch {
          setPost(null);
          setIsLoading(false);
        }
      };
      initializePost();
    }
  }, [initialPost]);

  const displayComments = post?.comments
    ? [...post.comments].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    : [];

  if (isLoading) {
    return (
      // <div></div>
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

  if (!post) {
    return null;
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(getApiUrl(`/api/posts?id=${id}`), {
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
      <Link href="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-10 group-hover:-translate-x-1 duration-300">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to all articles
      </Link>

      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">{post.title}</h1>

        {post.image ? (
          <div className="mb-8 overflow-hidden rounded-3xl">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
        ) : null}

        <div className="flex items-center gap-4 text-sm font-medium text-slate-500 bg-slate-50 px-4 py-3 rounded-full w-fit">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-400 to-slate-600 flex items-center justify-center text-xs text-white font-bold">
              {post.author.charAt(0)}
            </div>
            <span className="text-slate-700">{post.author}</span>
          </div>
          <span className="opacity-50">•</span>
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
          <span className="opacity-50">•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed">
        <MDXRemote {...post.mdxSource} />
      </div>

      <section id="comments" className="mt-12 border-t border-slate-200 pt-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Comments</h2>
          <Link
            href={`/blog/${post.slug}/comments`}
            className="inline-flex items-center justify-center bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Add Comment
          </Link>
        </div>

        {displayComments.length === 0 ? (
          <p className="text-slate-500">No comments yet..</p>
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
