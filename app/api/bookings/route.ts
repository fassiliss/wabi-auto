import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { sendBookingConfirmation } from '@/lib/email';

// GET all bookings
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const query = status && status !== 'all' ? { status } : {};
    
    const bookings = await Booking.find(query).sort({ appointmentDate: 1, createdAt: -1 });
    
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST create booking
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const booking = await Booking.create(body);
    
    // Send confirmation email
    try {
      await sendBookingConfirmation(booking);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the booking if email fails
    }
    
    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
