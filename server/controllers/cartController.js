import Cart from '../models/cartSchema.js'

const cartController = {
  getCart: async (req, res) => {
    try {
      const { userId } = req.params;
      
      const cart = await Cart.findOne({ user_id: userId }).populate('items._id');
      
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching cart details.' });
    }
  },

  addToCart: async (req, res) => {
    try {
      const { userId } = req.params;
      const { _id, quantity, price, subtotal } = req.body;

      const cart = await Cart.findOne({ user_id: userId });
      if (!cart) {
        const newCart = new Cart({
          user_id: userId,
          items: [{ _id, quantity, price, subtotal }],
          total_items: quantity,
          total_price: subtotal,
        });
        await newCart.save();
      } else {
        cart.items.push({ _id, quantity, price, subtotal });
        cart.total_items += quantity;
        cart.total_price += subtotal;
        await cart.save();
      }
      const cartWithItems  = await Cart.findOne({ user_id: userId }).populate('items._id');
      const pro=cartWithItems.items.find((item)=>item._id._id.toString()===_id)
      
      const result={
        _id: cartWithItems._id,
        userId:cartWithItems.user_id,
        items:pro,
        total_items:cartWithItems.total_items,
        total_price:cartWithItems.total_price
      }
      console.log('result:', result)

      res.status(201).json(result );
    } catch (error) {
      res.status(500).json({ error: 'Error adding items to the cart.' });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { userId, itemId} = req.params;
      

      const cart = await Cart.findOne({ user_id: userId });
      if (!cart) {
        res.status(404).json({ message: 'Cart not found.' });
        return;
      }

      const item = cart.items.find((item) => item._id.toString() === itemId);
      
      if (!item) {
        res.status(404).json({ message: 'Item not found in the cart.' });
        return;
      }

      cart.total_items -= item.quantity;
      cart.total_price -= item.subtotal;
      cart.items.pull(itemId);
      await cart.save();
      
      

      const saved = await Cart.findOne({ user_id: userId });

      const price=saved.total_items;
      const items=saved.total_items;

      res.status(200).json({itemId, price,items});
    } catch (error) {
      res.status(500).json({ error: 'Error removing item from the cart.' });
    }
  },
};

export default cartController;
