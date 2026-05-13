import PostCard from "@/components/PostCard";
import type { Metadata } from 'next';
import { generateCommonMetadata, keywords } from "@/lib/metadata";
import { getAllPostsFromDb } from "@/lib/post-queries";

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
  'The Dev Blog - Web Development Articles & Tutorials',
  'Explore articles on web development, Next.js, React, TypeScript, and modern web technologies.',
  '/',
  undefined,
  keywords.home
);

async function getPosts(): Promise<Post[]> {
  // Artificial delay to demonstrate loading.tsx
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const posts = await getAllPostsFromDb();
    return posts as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          The Dev Blog
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Short articles on the modern web, sharing insights and best practices for developers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
