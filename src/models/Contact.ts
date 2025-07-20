
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Please provide a message.'],
  },
  status: {
    type: String,
    enum: ['new', 'replied'],
    default: 'new',
  }
}, {
  timestamps: true,
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
