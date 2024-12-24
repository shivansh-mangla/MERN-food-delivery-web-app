import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'

const LoginPopup = ({setShowLogin}) => {

  const [currentState, setCurrentState] = useState("Sign Up")

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentState==="Sign Up"
            ?<input type="text" placeholder='Your name' required />:<></>
          }
          <input type='email' placeholder='Your email' required />
          <input type="password" placeholder='Password' required />
        </div>
        <button>
          {currentState==="Sign Up"
            ?"Create Account":"Login"
          }
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing you agree that I can hack your device.</p>
        </div>
        {currentState==="Sign Up"
          ? <p>Already have an Account?? <span onClick={() => setCurrentState("Log In")}>Click Here</span></p>
          : <p>Create a new Account?? <span onClick={() => setCurrentState("Sign Up")}>Click Here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
