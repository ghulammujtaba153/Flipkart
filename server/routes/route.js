import express from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controllers.js";
import { addProduct, deleteProduct, getProductDetails, getProducts } from "../controllers/prouductController.js";
import cartController from "../controllers/cartController.js";
import { getDeliveryOrders, getDetailOfOrder, getOrders, orderDeliver, orderDelivered, placeOrder } from "../controllers/orderController.js";
import { getBasicStats, getMonthlyOrderCounts } from "../controllers/adminController.js";

const router=express.Router();

router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/products', getProducts);
router.get('/product/:id', getProductDetails)

router.get('/api/carts/:userId', cartController.getCart);
router.post('/api/carts/:userId/add', cartController.addToCart);
router.delete('/api/carts/:userId/remove/:itemId', cartController.removeFromCart);

router.post('/payment', placeOrder)

//admin

router.post('/admin/product', addProduct)
router.get('/users', getAllUsers)
router.get('/orders', getOrders)
router.get('/orders/:id', getDetailOfOrder)
router.put('/orders/:id/deliver', orderDeliver)

router.get('/products/:id', deleteProduct);

router.get('/delivery', getDeliveryOrders)
router.put('/delivery/:id', orderDelivered)
router.get('/stats', getBasicStats)
router.get('/monthly-order-counts', getMonthlyOrderCounts);
export default router;