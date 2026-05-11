import type { Metadata, ResolvingMetadata } from 'next';
import { generateArticleMetadata } from '@/lib/metadata';
import { PostPageClient } from './client';
import { notFound } from 'next/navigation';

type Post = {
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
  comments?: any[];
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/posts?t=${Date.now()}`,
      { cache: 'no-store' }
    );
    if (!response.ok) return null;

    const posts: Post[] = await response.json();
    return posts.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return generateArticleMetadata(
    post.title,
    post.excerpt,
    post.slug,
    post.image,
    post.author,
    post.date,
    [post.tag]
  );
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <PostPageClient initialPost={post} />;
}