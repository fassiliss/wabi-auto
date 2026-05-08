import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorizedResponse } from '@/lib/admin-auth';
import connectDB from '@/lib/mongodb';
import ChatSession from '@/models/ChatSession';

function sanitizeMessage(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 1000) : '';
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!isAdminRequest(request)) {
      return unauthorizedResponse();
    }

    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const session = await ChatSession.findById(id);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Chat not found' },
        { status: 404 },
      );
    }

    const now = new Date();
    const status = body?.status;
    const text = sanitizeMessage(body?.text);

    if (text) {
      session.messages.push({ sender: 'admin', text, createdAt: now });
      session.lastMessageAt = now;
    }

    if (status === 'open' || status === 'closed') {
      session.status = status;
    }

    session.updatedAt = now;
    await session.save();

    return NextResponse.json({ success: true, data: session });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update chat' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    if (!isAdminRequest(request)) {
      return unauthorizedResponse();
    }

    await connectDB();

    const { id } = await params;
    const session = await ChatSession.findByIdAndDelete(id);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Chat not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete chat' },
      { status: 500 },
    );
  }
}
