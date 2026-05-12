import { NextRequest, NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { revalidatePath } from 'next/cache';

const noStoreHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

const publicCacheHeaders = {
  'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=30',
};

const jsonResponse = (body: unknown, init: ResponseInit = {}) =>
  NextResponse.json(body, {
    ...init,
    headers: {
      ...noStoreHeaders,
      ...(init.headers as Record<string, string>),

    },
  });
  

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(posts, {
    headers: publicCacheHeaders,
  });
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content', 'author', 'date', 'tag', 'readTime'];
    const missingFields = requiredFields.filter(field => !body[field] || (typeof body[field] === 'string' && body[field].trim().length === 0));

    if (missingFields.length > 0) {
      return jsonResponse({
        error: `Missing or empty required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Validate field types and lengths
    if (typeof body.title !== 'string' || body.title.trim().length === 0) {
      return jsonResponse({ error: 'Title must be a non-empty string' }, { status: 400 });
    }

    if (body.title.length > 200) {
      return jsonResponse({ error: 'Title must be less than 200 characters' }, { status: 400 });
    }

    if (typeof body.content !== 'string' || body.content.trim().length === 0) {
      return jsonResponse({ error: 'Content must be a non-empty string' }, { status: 400 });
    }

    if (body.image && typeof body.image !== 'string') {
      return jsonResponse({ error: 'Image must be a string URL' }, { status: 400 });
    }

    // Generate slug from title if not provided
    const slug = body.slug || body.title.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .substring(0, 100); // Limit slug length

    if (!slug || slug.length === 0) {
      return jsonResponse({ error: 'Unable to generate slug from title' }, { status: 400 });
    }

    // Check if slug already exists
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return jsonResponse({ error: 'A post with this slug already exists' }, { status: 409 });
    }

    const newPost = new Post({
      title: body.title.trim(),
      slug,
      excerpt: body.excerpt.trim(),
      content: body.content.trim(),
      author: body.author.trim(),
      date: body.date,
      tag: body.tag.trim(),
      readTime: body.readTime.trim(),
      image: body.image?.trim() || 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1200',
    });

    await newPost.save();
    revalidatePath('/');
    return jsonResponse(newPost, { status: 201 });

  } catch (error: any) {
    console.error('Error creating post:', error);

    // Handle MongoDB validation errors
    if (error?.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return jsonResponse({
        error: `Validation failed: ${validationErrors.join(', ')}`
      }, { status: 400 });
    }

    // Handle MongoDB duplicate key errors
    if (error?.code === 11000) {
      return jsonResponse({
        error: 'A post with this slug already exists'
      }, { status: 409 });
    }

    return jsonResponse({
      error: 'Internal server error. Please try again later.'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return jsonResponse({ error: 'Post ID is required' }, { status: 400 });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return jsonResponse({ error: 'Post not found' }, { status: 404 });
    }

    revalidatePath('/');
    return jsonResponse({ message: 'Post deleted successfully' });
  } catch (error) {
    return jsonResponse({ error: 'Failed to delete post' }, { status: 500 });
  }
}

