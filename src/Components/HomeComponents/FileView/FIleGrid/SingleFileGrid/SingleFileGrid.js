import React, { useContext, useState } from 'react'
import FileModal from '../../FIleModal/FileModal';
import './singleFile.css'
import Statecontext from '../../../../Context/Statecontext';


const SingleFileGrid = ({ source, title }) => {
  const [open, setOpen] = useState(false);
  const {setFileNameTosend} = useContext(Statecontext);

  return (<>
    <div className='singleGrids' style={{ paddingTop: "1vh" }} onClick={()=>setFileNameTosend(title)} >

      <div className='gridContents'>
        <div className='folderImge'  onClick={() => { setOpen(true);}}>
          <img src={source} className='folderIcon' alt="" height={70} width={70}/>
        </div>

        <div className='titlegridContents'>
          <p>{title}</p>
        </div>

      </div>
    </div>
    <FileModal modalOpen={open} setModalOpen={setOpen}  />
  </>
  )
}

export default SingleFileGrid
