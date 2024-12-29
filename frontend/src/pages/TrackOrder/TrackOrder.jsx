import React, { useContext, useEffect, useState } from 'react'
import './TrackOrder.css'
import { StoreContext } from '../../Context/StoreContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import resPinIcon from '../../assets/frontend_assets/resPinIcon.svg';
import bikePinIcon from '../../assets/frontend_assets/bikePinIcon.svg';
import L from 'leaflet';
import axios from 'axios';
import ChatBot from '../../components/ChatBot/ChatBot';


const iconTomato = new L.Icon({
  iconUrl: resPinIcon,
  iconRetinaUrl: resPinIcon,
  popupAnchor:  [-0, -0],
  iconSize: [45,45],     

});

const iconBike = new L.Icon({
  iconUrl: bikePinIcon,
  iconRetinaUrl: bikePinIcon,
  popupAnchor:  [-0, -0],
  iconSize: [38,38],     

});

const TrackOrder = () => {

  const {url, token, trackOrderId, setTrackOrderId} = useContext(StoreContext);

  const [location, setLocation] = useState({latitude: 28.714, longitude:77.108})
  const [data, setData] = useState(null)

  useEffect(()=>{
    if(!trackOrderId) 
      setTrackOrderId(JSON.parse(localStorage.getItem('orderId')));

    const getOrderData = async () =>{
      const response = await axios.post(url+"/api/order/track", {orderId: JSON.parse(localStorage.getItem('orderId'))})
      // console.log(response.data)
      setData(response.data.data)
    }

    getOrderData()
  }, [])

  useEffect(()=>{
    console.log("data is: ", data)
  }, [data])



  return (
    <div className='track-order'>
      <ChatBot />
      
      <h1>Track Your Order Here</h1>
      <MapContainer center={[location.latitude, location.longitude]} zoom={13} style={{ height: '400px', width: '85%' }}>
        <TileLayer attribution='TomatoFood.org' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[location.latitude, location.longitude]} icon={iconTomato}>
          <Popup>
            <b>Our Lovely Kitchen</b>
          </Popup>
        </Marker>
      </MapContainer>
      <div className="order-details">
        <h2>Order Status: <span>{data ? data.status : "Fetching.."}</span></h2>
        <div className="order-details2">
          <h5>Name: {data ? data.address.firstName + " " + data.address.lastName : "Fetching.."}</h5>
          <h5>Address: {data ? data.address.street : "Fetching.."}</h5>
          <h5>Phone: {data ? data.address.phone : "Fetching.."}</h5>

          {data? data.items.map((item, index)=>{
            return(
              <p>{item.name} X {item.quantity}</p>
            )
          }) : ""}
        </div>
      </div>
      <div className="payment">
        {data ? <h3>Amount Payable: ${data.amount} <br />(Please pay online before to avoid cash)</h3> : ""}
        {data ? ( // Render only when qrCode exists
          <img src={data.qrCode} alt="QR Code" />
        ) : (
          <p>Loading QR Code...</p> // Fallback content while waiting
        )}
      </div>
    </div>
  )
}

export default TrackOrder
