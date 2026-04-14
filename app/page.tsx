import PostCard from "@/components/PostCard";
import { Post } from "@/lib/posts";

export const dynamic = 'force-dynamic';

async function getPosts(): Promise<Post[]> {
  // Artificial delay to demonstrate loading.tsx
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/posts`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
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
