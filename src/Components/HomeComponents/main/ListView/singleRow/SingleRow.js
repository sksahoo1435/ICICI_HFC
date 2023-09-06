import React from 'react'
import "./singleRow.css"
import smallFolder from "../../../../../Assets/folderImg.svg";
const SingleRow = ({heading,dateModified,type,onClick}) => {


  return (
    <tr className='singleRow' onClick={onClick} >
      <td > <div className='nameDiv'><img src={smallFolder} alt="" height={50} width={50} />&nbsp;&nbsp;&nbsp; {heading} </div></td>
      <td>{dateModified}</td>
      <td>{type}</td>

    </tr>
  )
}

export default SingleRow
