import React from 'react'
import './App.css'
import PendingOrders from './pages/PendingOrders/PendingOrders'
import { Route, Routes } from 'react-router-dom'
import TrackOrder from './pages/TrackOrder/TrackOrder'


const url = "http://localhost:4000"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='' element={<PendingOrders url={url} />} />
        <Route path='/track' element={<TrackOrder url={url} />} />
      </Routes>
    </div>
  )
}

export default App
