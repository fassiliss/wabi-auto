import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { getErrorMessage } from '@/lib/errors';
import ServiceRequest from '@/models/ServiceRequest';
import { isAdminRequest, unauthorizedResponse } from '@/lib/admin-auth';

// GET - Get all service requests
export async function GET(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) {
      return unauthorizedResponse();
    }

    await connectDB();
    const requests = await ServiceRequest.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: requests });
  } catch (error) {
    console.error('MongoDB Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: getErrorMessage(error),
    }, { status: 500 });
  }
}

// POST - Create new service request
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const serviceRequest = await ServiceRequest.create(body);
    return NextResponse.json({ success: true, data: serviceRequest }, { status: 201 });
  } catch (error) {
    console.error('MongoDB Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: getErrorMessage(error),
    }, { status: 400 });
  }
}
