import type { Metadata, ResolvingMetadata } from 'next';
import { generateArticleMetadata } from '@/lib/metadata';
import { PostPageClient } from './client';
import { notFound } from 'next/navigation';
import { getPostBySlugFromDb } from '@/lib/post-queries';

export const revalidate = 60;

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
    const post = await getPostBySlugFromDb(slug);
    return post as Post | null;
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