import React from 'react'
import "./Settings.css";
import CollapseComp from './Collaps/Collapse';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const SettingsComp = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='settingComp'>
        <p className="goBack" onClick={() => { navigate("/home") }}>
          <ArrowBackIosIcon style={{ height: "1.5vh", color: "#063E67", marginLeft: "1vw" }} />  Back to Home Page </p>
        <p className='settings'> Settings  </p>
        <CollapseComp />
      </div>
    </>
  )
}

export default SettingsComp
