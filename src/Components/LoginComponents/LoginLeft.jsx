import React from 'react'
import loginfilemanage from "../../Assets/loginfilemanage.svg";
import './loginform.css';

const LoginLeft = () => {
  return (
    <>
        <div id="container" className='px-14 mx-10  grid place-items-center '>
            <div>
                <h3 className='text-[#36556B] text-2xl 2xl:text-4xl' style={{fontFamily: 'Noto Sans', fontWeight:"500"}} id='textLeft'>Sign In Using Your User Id</h3>
            </div>
            <div id="illustration">
                <img className='h-[60vh] 2xl:h-[65vh] mt-[-30vh]' src={loginfilemanage} alt="login_file_manager.svg" />
            </div>
        </div>
    </>
  )
}

export default LoginLeft