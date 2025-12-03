import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  category: {
    type: String,
    enum: ['Car Maintenance', 'Repair Tips', 'Auto News', 'How To', 'Company News'],
    default: 'Auto News',
  },
  imageUrl: {
    type: String,
    default: '/images/blog/default-blog.jpg',
  },
  author: {
    type: String,
    default: 'Wabi Auto Team',
  },
  published: {
    type: Boolean,
    default: false,
  },
  views: {
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

// Update updatedAt on save
BlogPostSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
