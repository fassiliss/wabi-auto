import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  // Customer Info
  customerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  
  // Vehicle Info
  vehicleMake: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  vehicleYear: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    default: '',
  },
  
  // Service Details
  serviceType: {
    type: String,
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  appointmentTime: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
  
  // Status Tracking
  status: {
    type: String,
    enum: ['scheduled', 'checked-in', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  checkedInAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  
  // Notifications
  notificationPreference: {
    type: String,
    enum: ['email', 'sms', 'both'],
    default: 'email',
  },
  notificationSent: {
    type: Boolean,
    default: false,
  },
  
  // Admin Notes
  adminNotes: {
    type: String,
    default: '',
  },
  estimatedCost: {
    type: Number,
    default: 0,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
