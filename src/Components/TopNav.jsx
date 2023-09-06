import React from 'react'
import icicilogo from "../Assets/icicilogo.svg"

const TopNav = () => {
  return (
    <>
        <div id="container" className='py-2 px-3 fixed bg-white w-[100%]'>
          <div id="left">
            <img className='2xl:w-[20vw]' src={icicilogo} alt="" />
          </div>
        </div>
    </>
  )
}

export default TopNav