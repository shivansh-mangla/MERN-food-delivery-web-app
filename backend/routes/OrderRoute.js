import express from 'express'
import authMiddleware from '../middlewares/Auth.js';
import { getAllOrders, placeOrder, trackOrder, updateStatus, userOrders } from '../controllers/orderController.js'
import { makeQRCode } from '../controllers/paymentController.js';


const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder)
orderRouter.post("/userorders",authMiddleware, userOrders)
orderRouter.get("/getallorders", getAllOrders)
orderRouter.post("/status", updateStatus)
orderRouter.post("/track", trackOrder)
// orderRouter.post("/pay", makeQRCode)


export default  orderRouter;