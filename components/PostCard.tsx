import Link from "next/link";
// import { Post } from "@/lib/posts";

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
}
type Props = {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-lg transition-all duration-300 bg-white group"
    >
      <h2 className="font-semibold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">{post.title}</h2>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed">{post.excerpt}</p>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-400 to-slate-600 flex items-center justify-center text-xs text-white font-bold">
            {post.author.charAt(0)}
          </div>
          <span>{post.author}</span>
        </div>
        <span>{post.date}</span>
      </div>
    </Link>
  );
}