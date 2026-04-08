import Link from "next/link";

type Props = {
  post: {
    slug: String,
    title: String,
    excerpt: String,
    author: String,
    date: String,
  }
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border border-stone-200 rounded-xl p-5 hover:border-stone-400 hover:shadow-sm transition-all bg-white"
    >
      <h2 className="font-semibold text-stone-900 mb-1">{post.title}</h2>
      <p className="text-sm text-stone-500 mb-4">{post.excerpt}</p>
      <div className="flex items-center justify-between text-xs text-stone-400">
        <span>{post.author}</span>
        <span>{post.date}</span>
      </div>
    </Link>
  );
}