import { posts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">The Dev Blog</h1>
      <p className="text-stone-500 mb-10">Short articles on the modern web.</p>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
