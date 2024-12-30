import orderModel from "../models/orderModel.js"
import riderModel from "../models/riderModel.js"



const newRider = async (req, res)=>{
  const rider = new riderModel({
    name: req.body.data.name,
    phone: req.body.data.phone
  })

  await rider.save()
  res.json({success:true, riderId: rider._id})
}


const acceptOrder = async (req, res)=>{
  const riderId = req.body.riderId
  const order = req.body.order

  await orderModel.findByIdAndUpdate(order._id, {status: "Order Out For Delivery", riderId: riderId})
  await riderModel.findByIdAndUpdate(riderId, {orderId: order._id})

  res.json({success: true})
}


const updateRiderLocation = async (req, res)=>{
  const riderId = req.body.riderId
  const lat = req.body.location.latitude
  const long = req.body.location.longitude

  await riderModel.findByIdAndUpdate(riderId, {location: {lat: lat, long: long}})
  res.json({success: true})
}


const getRiderInfo = async (req, res)=>{
  const riderId = req.body.riderId
  const rider = await riderModel.findById(riderId)
  // console.log(rider.location)

  res.json({success:true, riderInfo: {name:rider.name, phone:rider.phone, location: rider.location}})
}

export {newRider, acceptOrder, updateRiderLocation, getRiderInfo}