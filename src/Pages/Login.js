import React from 'react'
import TopNav from '../Components/TopNav'
import LoginLeft from '../Components/LoginComponents/LoginLeft'
import LoginFormPart from '../Components/LoginComponents/LoginFormPart';
import './login.css';
const Login = () => {
  return (
    <>
      {/* Login */}
      <TopNav />
      <div id="container_left_right" className='min-h-screen bg-[#FFE7DC] flex overflow-hidden'>
          <LoginLeft />
          <LoginFormPart />
      </div>
    </>
  )
}
export default Login