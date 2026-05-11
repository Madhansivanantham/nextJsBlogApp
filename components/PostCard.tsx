import Image from "next/image";
import Link from "next/link";
// import { Post } from "@/lib/posts";

const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgMTYgOSI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjkiIGZpbGw9IiNkM2Q1ZTEiLz48L3N2Zz4=';

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

type Props = {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-lg transition-all duration-300 bg-white group"
    >
      {post.image ? (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataURL}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : null}

      <div className="p-6">
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
      </div>
    </Link>
  );
}
