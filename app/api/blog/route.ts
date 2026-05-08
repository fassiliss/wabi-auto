import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { getErrorMessage } from '@/lib/errors';
import BlogPost from '@/models/BlogPost';
import { isAdminRequest, unauthorizedResponse } from '@/lib/admin-auth';

// GET - Get all blog posts (public = published only, admin = all)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin') === 'true';

    if (admin && !isAdminRequest(request)) {
      return unauthorizedResponse();
    }
    
    const query = admin ? {} : { published: true };
    const posts = await BlogPost.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: getErrorMessage(error),
    }, { status: 500 });
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) {
      return unauthorizedResponse();
    }

    await connectDB();
    const body = await request.json();
    
    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const blogPost = await BlogPost.create({ ...body, slug });
    return NextResponse.json({ success: true, data: blogPost }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: getErrorMessage(error),
    }, { status: 400 });
  }
}
