import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ullam mollitia a cum et, blanditiis quibusdam quasi praesentium pariatur harum amet totam eaque iusto labore, temporibus asperiores quia! At, saepe!</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get In Touch</h2>
          <ul>
            <li>+91 8588899023</li>
            <li>Contact at: ksbhjnj@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>
        Copyright 2024 Tomato.com - All rights reserved
      </p>
    </div>
  )
}

export default Footer
