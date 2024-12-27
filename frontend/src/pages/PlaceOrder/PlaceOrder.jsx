import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {

  const {getTotalCartAmount, token, food_list, url, cartItems} = useContext(StoreContext)

  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value

    setData(data =>({...data, [name]:value}))
  }


  // useEffect(()=>{
  //   console.log(data)
  // }, [data])

  const placeOrder = async (e) =>{
    e.preventDefault()

    let orderItems = [];
    food_list.map((item, index)=>{
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    // console.log(orderItems);
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    }
    let response = await axios.post(url+"/api/order/place", orderData, {headers: {token}})
    
    if(!response.data.success){
      navigate("/")
      return toast.error(response.data.message)
    }

    toast.success(response.data.message)   
    navigate("/myorders")
  }

  useEffect(()=>{
    if(!token || getTotalCartAmount()===0)
      navigate('/cart')
  }, [token])

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name='pincode' onChange={onChangeHandler} value={data.pincode} type="text" placeholder='Pin Code'/>
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>


      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>$ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>$ {getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>      
    </form>
  )
}

export default PlaceOrder
