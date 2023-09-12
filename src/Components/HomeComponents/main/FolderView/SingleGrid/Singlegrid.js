import React from 'react'
import "./Singlegrid.css"
import foldericon from "../../../../../Assets/folderImg.svg";


const Singlegrid = ({ datas, onClick }) => {

  return (
    <div className='singleGrid' onClick={onClick}>
      <div className='gridContent'>
        <img src={foldericon} className='folderIcon' alt="" />
        <p className='tileGrid'>{datas}</p>
      </div>
    </div>
  )
}

export default Singlegrid
