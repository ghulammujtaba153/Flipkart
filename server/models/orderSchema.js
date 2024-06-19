import Products from './productSchema.js';
import User from './userSchema.js'
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User, 
    required: true,
  },
  address: {
    type: String, 
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Products, 
        required: true,
      },
      
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
