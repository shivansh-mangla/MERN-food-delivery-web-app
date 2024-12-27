import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {

  const {url, setToken} = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Sign Up")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setData(data=>({...data, [name]:value}))
  }

  // useEffect(()=>{
  //   console.log(data)
  // }, [data])

  const onLogin = async (event) =>{
    event.preventDefault()
    let newURL = url;
    if(currentState === "Log In")
      newURL += "/api/user/login"
    else
      newURL += "/api/user/register"

    const response = await axios.post(newURL, data)
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
      toast.success("Success!!")
    }
    else{
      alert(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentState==="Sign Up"
            ?<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />:<></>
          }
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>
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
