import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import ChatSession from '@/models/ChatSession';

function sanitizeMessage(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 1000) : '';
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ success: true, data: null });
    }

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return NextResponse.json({ success: true, data: null });
    }

    const session = await ChatSession.findById(sessionId);

    if (!session) {
      return NextResponse.json({ success: true, data: null });
    }

    return NextResponse.json({ success: true, data: session });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to load chat' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const text = sanitizeMessage(body?.text);

    if (!text) {
      return NextResponse.json(
        { success: false, error: 'Please enter a message' },
        { status: 400 },
      );
    }

    const savedSessionId = typeof body?.sessionId === 'string' ? body.sessionId : '';
    let session = savedSessionId && mongoose.Types.ObjectId.isValid(savedSessionId)
      ? await ChatSession.findById(savedSessionId)
      : null;
    const now = new Date();

    if (!session) {
      session = await ChatSession.create({
        messages: [{ sender: 'visitor', text, createdAt: now }],
        lastMessageAt: now,
        updatedAt: now,
      });
    } else {
      session.messages.push({ sender: 'visitor', text, createdAt: now });
      session.status = 'open';
      session.lastMessageAt = now;
      session.updatedAt = now;
      await session.save();
    }

    return NextResponse.json({ success: true, data: session }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (sessionId && mongoose.Types.ObjectId.isValid(sessionId)) {
      await ChatSession.findByIdAndUpdate(sessionId, {
        status: 'closed',
        updatedAt: new Date(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to clear chat' },
      { status: 500 },
    );
  }
}
