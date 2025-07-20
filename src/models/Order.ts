import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IOrder extends Document {
  userId: string;
  productId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMode: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  statusHistory: Array<{ status: string; changedAt: Date; changedBy: string }>;
  createdAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  paymentMode: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  statusHistory: [
    {
      status: { type: String },
      changedAt: { type: Date },
      changedBy: { type: String },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

export default (mongoose.models.Order as Model<IOrder>) || mongoose.model<IOrder>('Order', OrderSchema); 