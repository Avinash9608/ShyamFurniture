import mongoose from 'mongoose';

const DimensionsSchema = new mongoose.Schema({
  length: { type: String },
  width: { type: String },
  height: { type: String },
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name.'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category.'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price.'],
  },
  discountPrice: {
    type: Number,
  },
  images: {
    type: [String],
    required: [true, 'Please provide at least one image.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  features: {
    type: [String],
  },
  dimensions: {
    type: DimensionsSchema,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  deliveryInfo: {
    type: String,
  },
  customizable: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
