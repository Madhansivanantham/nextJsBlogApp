import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';
import { Post } from '@/lib/posts';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  // For now, we'll keep this simple - in a real app you'd write to MDX files
  const body: Omit<Post, 'slug'> = await request.json();
  const slug = body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  const newPost: Post = { ...body, slug };
  // Note: This won't persist to MDX files yet - you'd need to implement file writing
  revalidatePath('/');
  return NextResponse.json(newPost, { status: 201 });
}