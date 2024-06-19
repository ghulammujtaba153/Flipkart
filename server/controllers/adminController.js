import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js"

export const getBasicStats=async(req, res)=>{
    try {

        const totalUsers=await User.countDocuments();
        const totalOrders=await Order.countDocuments();

        const totalAmount = await Order.aggregate([
            {
              $group: {
                _id: null,
                totalAmount: { $sum: '$totalAmount' }
              }
            }
          ]);
      
          const stats = {
            totalUsers,
            totalOrders,
            totalAmount: totalAmount.length > 0 ? totalAmount[0].totalAmount : 0
          };
      
          res.status(200).json(stats);
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}



export const getMonthlyOrderCounts = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const monthlyCounts = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json(monthlyCounts);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
};
