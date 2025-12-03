import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    default: 'Customer',
  },
  company: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5,
  },
  testimonial: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'https://ui-avatars.com/api/?name=Customer&background=2563eb&color=fff&size=200',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
