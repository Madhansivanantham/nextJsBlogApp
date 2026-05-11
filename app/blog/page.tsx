import PostCard from "@/components/PostCard";
import type { Metadata } from 'next';
import { generateCommonMetadata, keywords } from "@/lib/metadata";

interface Post {
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
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = generateCommonMetadata(
  'Blog - Articles on Web Development',
  'Read our latest articles on web development, Next.js, React, TypeScript, and modern web technologies.',
  '/blog',
  undefined,
  keywords.blog
);

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/posts`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Blog Articles
        </h1>
        <p className="text-slate-600 text-lg">
          Explore our collection of articles on modern web development, best practices, and tutorials.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg">No blog posts found.</p>
        </div>
      )}
    </div>
  );
}
