import React from 'react'
import './Order.css'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import {assets} from '../../assets/admin_assets/assets.js'

const Orders = ({url}) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () =>{
    const response = await axios.get(url+"/api/order/getallorders")

    if(response.data.success){
      setOrders(response.data.data)
      console.log(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  const statusHandler = async (e, orderId) =>{
    const response = await axios.post(url+"/api/order/status", {orderId, status: e.target.value})

    if(response.data.success){
      await fetchAllOrders()
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index)=>{
          return (
            <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, i2)=>{
                    return item.name + " X " + item.quantity
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + " , " + order.address.city + ", " + order.address.pincode}</p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>

              <select onChange={(event)=>statusHandler(event, order._id)} value={order.status}>
                <option value="Order Placed">Order Placed</option>
                <option value="Order Accepted">Order Accepted</option>
                <option value="Order Preparing">Order Preparing</option>
                <option value="Order Out For Delivery">Order Out For Delivery</option>
                <option value="Order Delivered">Order Delivered</option>
                <option value="Order Cancelled">Order Cancelled</option>
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders
