import React from "react";
import './loginform.css'
import tickmark from '../../Assets/checkmark.svg'

const WelcomePopup = ({ message, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup">
                <div style={{position:"relative",display:"flex",flexDirection:"row",gap:"1vw"}}>

                    <img src={tickmark} alt="success pic" />
                    <p className="message">{message}</p>

                </div>

                <p className="close-button_popup" onClick={onClose}>Ok</p>
            </div>
        </div>
    );
};

export default WelcomePopup;
