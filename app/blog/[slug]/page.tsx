import { posts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto">
      <Link href="/" className="text-sm text-stone-400 hover:text-stone-700 mb-8 inline-block">
        ← All articles
      </Link>

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      <div className="flex gap-3 text-sm text-stone-400 mb-8">
        <span>{post.author}</span>
        <span>·</span>
        <span>{post.date}</span>
      </div>

      <p className="text-stone-600 leading-relaxed">{post.content}</p>
    </article>
  );
}