import mongoose from 'mongoose';

const ServiceRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
  },
  service: {
    type: String,
    required: [true, 'Please select a service'],
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'scheduled', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.ServiceRequest || mongoose.model('ServiceRequest', ServiceRequestSchema);
