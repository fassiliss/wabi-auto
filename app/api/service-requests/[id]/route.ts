import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { getErrorMessage } from '@/lib/errors';
import ServiceRequest from '@/models/ServiceRequest';
import { isAdminRequest, unauthorizedResponse } from '@/lib/admin-auth';

// PATCH - Update service request status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAdminRequest(request)) {
      return unauthorizedResponse();
    }

    await connectDB();
    const body = await request.json();
    const { id } = await params;

    const serviceRequest = await ServiceRequest.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!serviceRequest) {
      return NextResponse.json({ success: false, error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: serviceRequest });
  } catch (error) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}

// DELETE - Delete service request
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAdminRequest(request)) {
      return unauthorizedResponse();
    }

    await connectDB();
    const { id } = await params;

    const serviceRequest = await ServiceRequest.findByIdAndDelete(id);

    if (!serviceRequest) {
      return NextResponse.json({ success: false, error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}
