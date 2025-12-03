import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { sendServiceCompleteNotification } from '@/lib/email';

// GET single booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

// PATCH update booking
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    // Update timestamps based on status
    if (body.status === 'checked-in' && !body.checkedInAt) {
      body.checkedInAt = new Date();
    }
    if (body.status === 'completed' && !body.completedAt) {
      body.completedAt = new Date();
    }

    body.updatedAt = new Date();

    const booking = await Booking.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Send notification if status changed to completed
    if (body.status === 'completed' && !booking.notificationSent) {
      try {
        await sendServiceCompleteNotification(booking);
        await Booking.findByIdAndUpdate(id, { notificationSent: true });
      } catch (emailError) {
        console.error('Notification sending failed:', emailError);
      }
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}
