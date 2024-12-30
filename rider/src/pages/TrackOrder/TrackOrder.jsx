import React from 'react'
import './TrackOrder.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios'


const TrackOrder = ({url}) => {

  const [location, setLocation] = useState({})

  const getOrderDetails = ()=>{
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"))
    console.log(orderDetails)
  }

  const getRiderLocation = async () => {
    if (navigator.geolocation) {
      try {
        // Wrap geolocation in a promise
        const getPosition = () => {
          return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
              },
              (error) => reject(error)
            );
          });
        };
  
        // Wait for the location
        const currentLocation = await getPosition();
        console.log("Current location:", currentLocation);
  
        // Update state with the new location
        setLocation(currentLocation);
  
        // Make the API request
        const response = await axios.post(url + "/api/rider/updatelocation", {
          location: currentLocation, // Use the resolved location
          riderId: "677222ac5cffa79e06c14b74",
        });
  
        console.log("Response from server:", response.data);
      } catch (error) {
        console.error("Error getting location or sending to backend:", error);
      }
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      getRiderLocation();
    }, 6000); 
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(()=>{
    getOrderDetails()
  }, [])

  return (
    <div className='track-order'>
      <h1>Track Order</h1>
      <h3>Latitutude: {location.latitude}</h3>
      <h3>Longitude: {location.longitude}</h3>
    </div>
  )
}

export default TrackOrder
