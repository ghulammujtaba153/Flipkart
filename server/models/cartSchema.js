import mongoose from "mongoose";
import User from './userSchema.js'
import Products from './productSchema.js';

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: User }, 
  items: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: Products }, 
      quantity: { type: Number, required: true }, 
      price: { type: Number, required: true }, 
      subtotal: { type: Number, required: true } 
    }
    
  ],
  total_items: { type: Number, default: 0 }, 
  total_price: { type: Number, default: 0 } 
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
