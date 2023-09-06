import React from 'react'
import "./Singlegrid.css"
import foldericon from "../../../../../Assets/folderImg.svg";
const Singlegrid = ({title,onClick}) => {
  return (
    <div className='singleGrid' onClick={onClick}>
    <div className='gridContent'>
      <img src={foldericon} className='folderIcon' alt=""/>
        <p className='tileGrid'>{title}</p>
        </div>
    </div>
  )
}

export default Singlegrid
