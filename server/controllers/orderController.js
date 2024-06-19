import Order from '../models/orderSchema.js'
import User from '../models/userSchema.js';

export const placeOrder = async (req, res) => {
    try {
      const orderData = req.body; // Assuming req.body contains the order data
  
      // Insert the order into the database using your model method (e.g., Order.create)
      const createdOrder = await Order.create(orderData);
  
      res.status(201).json({ message: 'Order placed successfully', order: createdOrder });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while placing the order', error: error.message });
    }
  };


  //admin

  export const getOrders=async(req, res)=>{
    try {

      const orders=await Order.find({}).populate('customer').populate('items.product')
      res.status(201).json(orders)
      
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while getting the order', error: error.message });
    }
  }

  export const getDetailOfOrder = async (req, res) => {
    try {
      
      const orderId = req.params.id; 
      const order = await Order.findById(orderId)
        .populate('customer')
        .populate('items.product');
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while getting the order', error: error.message });
    }
  };


  export const orderDeliver = async (req, res) => {
    try {
      
      const orderId = req.params.id; 
      const order = await Order.updateOne(
        { _id : orderId },
        { $set: { status : 'Shipped' } }
      )
        
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while getting the order', error: error.message });
    }
  };

  export const orderDelivered = async (req, res) => {
    try {
      
      const orderId = req.params.id; 
      const order = await Order.updateOne(
        { _id : orderId },
        { $set: { status : 'Delivered' } }
      )
        
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while getting the order', error: error.message });
    }
  };
  

  export const getDeliveryOrders=async(req, res)=>{
    try {
      const orders=await Order.find({status: 'Shipped'}).populate('customer').populate('items.product')
      res.status(201).json(orders)
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while getting the order', error: error.message });
    }
  }