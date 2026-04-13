"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
};

export default function PostPage() {
  const params = useParams();
  const slug = params.slug as string;
  console.log("params: ", params)
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data: Post[]) => {
        const foundPost = data.find((p) => p.slug === slug);
        setPost(foundPost || null);
      })
      .catch(() => setPost(null));
  }, [slug]);

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
        {post.content.split('\n').map((paragraph, index) => (
          paragraph.trim() ? <p key={index} className="mb-6">{paragraph}</p> : null
        ))}
      </div>
    </article>
  );
}