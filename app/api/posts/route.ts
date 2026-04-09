import { NextRequest, NextResponse } from 'next/server';
import { posts } from '@/lib/posts';
import { Post } from '@/types/post';

export async function GET() {
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const body: Omit<Post, 'slug'> = await request.json();
  const slug = body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  const newPost: Post = { ...body, slug };
  posts.push(newPost);
  return NextResponse.json(newPost, { status: 201 });
}