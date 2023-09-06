import React from 'react';
import Download from './Download';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CenterDownload = ({ setActiveTab }) => {
  return (
    <div className='centerDownUP'>

      <div
        id="top-navs"
        className="flex hover:underline"
        style={{ width: "13vw", marginLeft: "4vw",marginTop:"-2vh" }}
        onClick={() => {
          setActiveTab(0);
        }}
      >
        <div>
          <ArrowBackIosIcon style={{ height: '2vh', marginBottom: "2.2vh", color: '#063E67' }} />
        </div>
        <div className="back_home_page">
          Back To Home Page
        </div>
      </div>

      <div className='centerDownUPContent'>
        <div className='headingUp'>

          <div className={"uploadtext"} >Download </div>

        </div>

        <div className='content' >
          <Download />
        </div>
      </div>
    </div>
  )
}

export default CenterDownload