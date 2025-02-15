import axios from "axios";
import { use } from "react";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{

  const url = "http://localhost:4000"
  // const url = "https://9302-2405-201-403c-8097-2c57-907d-96c2-1bde.ngrok-free.app/"

  const [food_list, setFoodList] = useState([]);

  const [token, setToken] = useState("");

  const [cartItems, setCartItems] = useState({});

  const [trackOrderId, setTrackOrderId] = useState("");

  const addToCart = async (itemId) => {
    if(!cartItems[itemId]){
      setCartItems((prev) => ({...prev, [itemId]:1}))
    }
    else{
      setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
    }
    if(token){
      await axios.post(url+"/api/cart/add", {itemId}, {headers: {token}})
    }
  }

  const removeFromCart = async (itemId) =>{
    setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
    if(token){
      await axios.post(url+"/api/cart/remove", {itemId}, {headers: {token}})
    }
  }


  const loadCartData = async (token) =>{
    const response = await axios.post(url+"/api/cart/get", {}, {headers: {token}})
    setCartItems(response.data.cartData)
  }

  const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for(const item in cartItems){
      if(cartItems[item] > 0){
        let itemInfo = food_list.find((product) => product._id===item);
        totalAmount += itemInfo.price * cartItems[item]
      }
    }
    return totalAmount;
  }


  const getFoodList = async ()=>{
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
  }

  useEffect(()=>{
    async function loadData(){
      await getFoodList()
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData()
  }, [])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token, 
    setToken,
    trackOrderId,
    setTrackOrderId
  }

  return(
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}


export default StoreContextProvider;