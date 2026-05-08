import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['visitor', 'admin'],
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const chatSessionSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open',
  },
  messages: {
    type: [chatMessageSchema],
    default: [],
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
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

export default mongoose.models.ChatSession || mongoose.model('ChatSession', chatSessionSchema);
