import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorizedResponse } from '@/lib/admin-auth';
import connectDB from '@/lib/mongodb';
import ChatSession from '@/models/ChatSession';

export async function GET(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) {
      return unauthorizedResponse();
    }

    await connectDB();

    const sessions = await ChatSession.find({})
      .sort({ lastMessageAt: -1, createdAt: -1 })
      .limit(100);

    return NextResponse.json({ success: true, data: sessions });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to load chats' },
      { status: 500 },
    );
  }
}
