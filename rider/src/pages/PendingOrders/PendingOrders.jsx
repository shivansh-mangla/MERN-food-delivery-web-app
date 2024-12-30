import React from 'react'
import './PendingOrders.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const PendingOrders = ({url}) => {

  const [allOrders, setAllOrders] = useState([])
  const navigate = useNavigate()

  const getElapsedTime = (dateTime) =>{
    const now = Date.UTC();
    const past = new Date(dateTime);

    const nowUTC = now
    const pastUTC = past
    // console.log(pastUTC)

    const diffMs = nowUTC - pastUTC;

    // Convert to hours and minutes
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    // console.log(diffHours, diffMinutes)
    return(`${diffHours}hrs ${diffMinutes}min`)
  }

  const acceptOrder = async (order) =>{
    localStorage.setItem("orderDetails", JSON.stringify(order))
    const riderId = "677222ac5cffa79e06c14b74"
    const response = await axios.post(url+"/api/rider/accept", {order:order, riderId: riderId})
    if(response.data.success)
      navigate('/track')
  }

  const fetchOrders = async () =>{
    const response = await axios.get(url+"/api/order/getallorders")
    if(response.data.success){
      setAllOrders(response.data.data)
    }
  }

  useEffect(()=>{
    fetchOrders()
  }, [])


  return (
    <div className='pending-orders'>
      <h1>Pending Orders</h1>
      <div className="order-details">
        <p>Items</p>
        <p>Amount</p>
        <p>Address</p>
        <p>Time Elapsed</p>
        <p>Take Order</p>
      </div>
      {allOrders ? allOrders.map((order, index)=>{
        if(order.status === "Order Preparing" || order.status === "Order Accepted" || order.status === "Order Placed"){
          return(
            <div key={index} className="order-details">
              <div>{order.items.map((item, index2)=>{
                return(<p key={index2}>{item.name} X {item.quantity}</p>)
              })}</div>

              <p>{order.amount}</p>
              <p>{order.address.street}</p>
              <p>{getElapsedTime(order.date)}</p>
              <button onClick={()=>acceptOrder(order)}>Take Order</button>
            </div>
          )
        }
        else return;
      })
      : <h1>No orders to show</h1> }
    </div>
  )
}

export default PendingOrders
