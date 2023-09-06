import React from 'react'
import "./Uploaddownload.css"
import MainUpload from './MainUpload';

const Center = () => {

  return (<>
    <div className='centerDownUP'>
      <p className='titleUpload'>Home {">"}Files {">"} Upload </p>
      <div className='centerDownUPContent'>
        <div className='headingUp'>

          <div className={"uploadtext"} >Upload </div>

        </div>
        
        <div className='content' >
          <MainUpload />
        </div>
      </div>
    </div>
  </>
  )
}

export default Center
