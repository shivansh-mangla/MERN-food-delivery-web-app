import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import qrcode from 'qrcode'



const makeQRCode = async (amount)=>{
  if(!amount)
      return -1;
  
  const upiString = `upi://pay?pa=8588899023@ptaxis&pn=TomatoFoodDel&am=${amount}&cu=INR&tn=`;

  try {
    const qrCode = await qrcode.toDataURL(upiString); // Generate QR code as base64
    return qrCode;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return -1;
  }
}


//placing user order from frontend
const placeOrder = async (req, res)=>{
  try {
    const qrString = await makeQRCode(req.body.amount)

    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      qrCode: qrString
    })

    await newOrder.save()
    await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}})
    res.json({success:true, message:"Order placed successfully!!"})

  } catch (error) {
    console.error();
    res.json({success:false, message:"Error!!"})
  }

}


//user orders for frontend
const userOrders = async (req, res)=>{
  try {
    const orders = await orderModel.find({userId: req.body.userId})
    res.json({success: true, data:orders})
  } catch (error) {
    res.json({success: false, message:"Error"})
  }
}


//get all orders of all the users
const getAllOrders = async (req, res)=>{
  try {
    const orders = await orderModel.find({})
    res.json({success: true, data:orders})
  } catch (error) {
    res.json({success: false, message:"Error"})
  }
}


//cancelling the order
// const cancelOrder = async (req, res)=>{
//   try {
//     const orderId = req.body.orderId;
//     await orderModel.findByIdAndDelete()
//   } catch (error) {
    
//   }
// }

export {placeOrder, userOrders, getAllOrders}
