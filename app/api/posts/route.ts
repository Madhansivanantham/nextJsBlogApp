import { NextRequest, NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(posts, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
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
      return NextResponse.json({
        error: `Missing or empty required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Validate field types and lengths
    if (typeof body.title !== 'string' || body.title.trim().length === 0) {
      return NextResponse.json({ error: 'Title must be a non-empty string' }, { status: 400 });
    }

    if (body.title.length > 200) {
      return NextResponse.json({ error: 'Title must be less than 200 characters' }, { status: 400 });
    }

    if (typeof body.content !== 'string' || body.content.trim().length === 0) {
      return NextResponse.json({ error: 'Content must be a non-empty string' }, { status: 400 });
    }

    // Generate slug from title if not provided
    const slug = body.slug || body.title.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .substring(0, 100); // Limit slug length

    if (!slug || slug.length === 0) {
      return NextResponse.json({ error: 'Unable to generate slug from title' }, { status: 400 });
    }

    // Check if slug already exists
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
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
    });

    await newPost.save();
    revalidatePath('/');
    return NextResponse.json(newPost, { status: 201 });

  } catch (error: any) {
    console.error('Error creating post:', error);

    // Handle MongoDB validation errors
    if (error?.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({
        error: `Validation failed: ${validationErrors.join(', ')}`
      }, { status: 400 });
    }

    // Handle MongoDB duplicate key errors
    if (error?.code === 11000) {
      return NextResponse.json({
        error: 'A post with this slug already exists'
      }, { status: 409 });
    }

    return NextResponse.json({
      error: 'Internal server error. Please try again later.'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    revalidatePath('/');
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

