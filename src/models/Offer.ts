
import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an offer title.'],
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'Please provide a promo code.'],
    unique: true,
    uppercase: true,
    trim: true,
  },
  discountPercentage: {
    type: Number,
    required: [true, 'Please provide a discount percentage.'],
    min: 0,
    max: 100,
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date.'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide an end date.'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Offer || mongoose.model('Offer', OfferSchema);
