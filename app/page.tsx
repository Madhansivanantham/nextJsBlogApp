"use client";

import { useState, useEffect } from "react";
import PostCard from "@/components/PostCard";
import { Post } from "@/types/post";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

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
