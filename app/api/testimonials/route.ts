import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

// GET all testimonials
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin');
    
    // If admin=true, return all testimonials, otherwise only published
    const query = admin === 'true' ? {} : { published: true };
    
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

// POST create testimonial
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const testimonial = await Testimonial.create(body);
    
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
