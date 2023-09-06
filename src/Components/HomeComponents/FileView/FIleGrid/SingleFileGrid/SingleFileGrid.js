import React, { useState } from 'react'
// import download from "../../../../../Assets/material-symbols_download.png";
import FileModal from '../../FIleModal/FileModal';
import './singleFile.css'


const SingleFileGrid = ({ source, title }) => {
  const [open, setOpen] = useState(false);

  return (<>
    <div className='singleGrids' style={{ paddingTop: "1vh" }} >

      <div className='gridContents'>

        {/* <div style={{zIndex:"50"}} className='downloadimg'>
          <img src={download} alt=""  />
        </div> */}

        <div className='folderImge'  onClick={() => { setOpen(true) }}>
          <img src={source} className='folderIcon' alt="" height={70} width={70}/>
        </div>

        <div className='titlegridContents'>
          <p>{title}</p>
        </div>

      </div>
    </div>
    <FileModal modalOpen={open} setModalOpen={setOpen} />
  </>
  )
}

export default SingleFileGrid
