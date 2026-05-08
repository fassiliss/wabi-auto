import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import ServiceRequest from '@/models/ServiceRequest';
import { isAdminRequest, unauthorizedResponse } from '@/lib/admin-auth';

type CustomerSource = 'booking' | 'service-request';

type RawBooking = {
  _id: { toString(): string };
  appointmentDate?: Date;
  appointmentTime?: string;
  createdAt?: Date;
  customerName: string;
  email: string;
  phone: string;
  serviceType: string;
  status: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: string;
};

type RawServiceRequest = {
  _id: { toString(): string };
  createdAt?: Date;
  email: string;
  message?: string;
  name: string;
  phone: string;
  service: string;
  status: string;
};

type CustomerRecord = {
  bookings: Array<{
    appointmentDate?: string;
    appointmentTime?: string;
    id: string;
    service: string;
    status: string;
    vehicle: string;
  }>;
  email: string;
  id: string;
  lastActivity: Date;
  lastService: string;
  name: string;
  phone: string;
  requests: Array<{
    createdAt?: string;
    id: string;
    message?: string;
    service: string;
    status: string;
  }>;
  source: CustomerSource;
  status: string;
  totalBookings: number;
  totalRequests: number;
};

function getCustomerKey(email: string, phone: string) {
  return `${email || 'no-email'}:${phone || 'no-phone'}`.toLowerCase();
}

function newerDate(a: Date, b: Date) {
  return a.getTime() > b.getTime() ? a : b;
}

export async function GET(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) {
      return unauthorizedResponse();
    }

    await connectDB();

    const [bookings, requests] = await Promise.all([
      Booking.find({}).sort({ createdAt: -1 }).lean<RawBooking[]>(),
      ServiceRequest.find({}).sort({ createdAt: -1 }).lean<RawServiceRequest[]>(),
    ]);

    const customers = new Map<string, CustomerRecord>();

    for (const booking of bookings) {
      const activityDate = booking.appointmentDate || booking.createdAt || new Date();
      const key = getCustomerKey(booking.email, booking.phone);
      const existing = customers.get(key);

      if (existing) {
        existing.totalBookings += 1;
        existing.bookings.push({
          appointmentDate: booking.appointmentDate?.toISOString(),
          appointmentTime: booking.appointmentTime,
          id: booking._id.toString(),
          service: booking.serviceType,
          status: booking.status,
          vehicle: [booking.vehicleYear, booking.vehicleMake, booking.vehicleModel].filter(Boolean).join(' '),
        });
        existing.lastActivity = newerDate(existing.lastActivity, activityDate);
        if (existing.lastActivity.getTime() === activityDate.getTime()) {
          existing.lastService = booking.serviceType;
          existing.status = booking.status;
          existing.source = 'booking';
        }
      } else {
        customers.set(key, {
          email: booking.email,
          id: booking._id.toString(),
          bookings: [{
            appointmentDate: booking.appointmentDate?.toISOString(),
            appointmentTime: booking.appointmentTime,
            id: booking._id.toString(),
            service: booking.serviceType,
            status: booking.status,
            vehicle: [booking.vehicleYear, booking.vehicleMake, booking.vehicleModel].filter(Boolean).join(' '),
          }],
          lastActivity: activityDate,
          lastService: booking.serviceType,
          name: booking.customerName,
          phone: booking.phone,
          requests: [],
          source: 'booking',
          status: booking.status,
          totalBookings: 1,
          totalRequests: 0,
        });
      }
    }

    for (const request of requests) {
      const activityDate = request.createdAt || new Date();
      const key = getCustomerKey(request.email, request.phone);
      const existing = customers.get(key);

      if (existing) {
        existing.totalRequests += 1;
        existing.requests.push({
          createdAt: request.createdAt?.toISOString(),
          id: request._id.toString(),
          message: request.message,
          service: request.service,
          status: request.status,
        });
        existing.lastActivity = newerDate(existing.lastActivity, activityDate);
        if (existing.lastActivity.getTime() === activityDate.getTime()) {
          existing.lastService = request.service;
          existing.status = request.status;
          existing.source = 'service-request';
        }
      } else {
        customers.set(key, {
          email: request.email,
          id: request._id.toString(),
          bookings: [],
          lastActivity: activityDate,
          lastService: request.service,
          name: request.name,
          phone: request.phone,
          requests: [{
            createdAt: request.createdAt?.toISOString(),
            id: request._id.toString(),
            message: request.message,
            service: request.service,
            status: request.status,
          }],
          source: 'service-request',
          status: request.status,
          totalBookings: 0,
          totalRequests: 1,
        });
      }
    }

    const data = Array.from(customers.values())
      .sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime())
      .map((customer) => ({
        ...customer,
        lastActivity: customer.lastActivity.toISOString(),
      }));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Customer API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customers' },
      { status: 500 },
    );
  }
}
