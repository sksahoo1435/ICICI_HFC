import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import alertImg from '../../../src/Assets/alertImg.svg';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './loginform.css';
import axios from 'axios';

const LoginFormPart = () => {
    const [toggleVisible, setToggleVisibility] = useState(false);
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [inputHasText, setInputHasText] = useState(false);
    const [inputHasTextPass, setInputHasTextPass] = useState(false);
    const [error, setError] = useState(null);
    const [useridError, setUseridError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);

    const navigate = useNavigate();

    const changeVisibility = () => {
        setToggleVisibility(!toggleVisible);
    }

    const handleLoginAction = async () => {
        const inputData = {
            "username": userid,
            "password": password
        }

        try {
            const getuserId = 'https://localhost:7062/api/ReportingModule/login';
            const response = await axios.post(
                getuserId,
                inputData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                if (!(userid && password)) {
                    setOpen(true);
                } else if (userid === "" || password === "") {
                    setOpen(true);
                } else {
                    
                    navigate("/home");
                }
            } else {
                setError('Invalid credentials');
                if (response.data.username !== userid) {
                    setUseridError(true);
                } else {
                    setPasswordError(true);
                }

                setLoginAttempts(loginAttempts + 1);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred');
            toast.error("please check the userId & Password.....",{theme:"colored"})
            setLoginAttempts(loginAttempts + 1);
        }
    }

    const handleUseridChange = (e) => {
        setUserid(e.target.value);
        setInputHasText(!!e.target.value);
        setUseridError(false);
        setError(null);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setInputHasTextPass(!!e.target.value);
        setPasswordError(false);
        setError(null);
    };

    return (
        <>
            {open ? (
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={() => { setOpen(false) }}
                    message="Fill all the fields"
                    severity="error"
                />
            ) : ""}
            <ToastContainer/>
            <div className="login-container">
                <h3 className="login-header">Sign In</h3>
                <div className="login-form">
                    <div className={`input-container ${useridError ? 'error-input' : ''}`}>
                        <label htmlFor="userid" className="input-label">User Id</label>
                        <input
                            type="text"
                            value={userid}
                            onChange={handleUseridChange}
                            className="input-field"
                            placeholder="Enter your User ID"
                            style={{ color: "black", paddingLeft: "1vw", fontSize: "1rem", border: error ? '1px solid red' : "1px solid #E2E2E2", backgroundColor: inputHasText ? 'white' : "#e3e0e0" }}
                        />
                    </div>
                    <div className={`input-container ${passwordError ? 'error-input' : ''}`}>
                        <label htmlFor="password" className="input-label">Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={toggleVisible ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                className="input-field"
                                placeholder="Enter your Password"
                                style={{ color: "black", paddingLeft: "1vw", fontSize: "1rem", border: error ? '1px solid red' : "1px solid #E2E2E2", backgroundColor: inputHasTextPass ? 'white' : "#e3e0e0" }}
                            />
                            <div className='showNhideButton'>
                                <IconButton
                                    sx={{ '&:hover': { backgroundColor: 'transparent' } }}
                                    disableRipple
                                    onMouseDown={changeVisibility}
                                    onMouseUp={changeVisibility}
                                >
                                    {toggleVisible ? (
                                        <VisibilityIcon style={{ color: "#302f2f" }} />
                                    ) : (
                                        <VisibilityOffIcon style={{ color: "#302f2f" }} />
                                    )}
                                </IconButton>
                            </div>
                        </div>
                    </div>

                    {loginAttempts >= 3 &&
                        <div style={{ display: "flex", height: "3.4vh",marginTop:"-0.5vh", flexDirection: "row", gap: "0.5vw", width: "100%", position: "relative" }}>
                            <img src={alertImg} alt='alert' />
                            <p style={{fontSize:"0.7rem",color:"red"}}>{`Your Account Has Been Locked Due To Multiple Attempts 
                                Please Contact Admin`}</p>
                        </div>}

                    <button
                        onClick={handleLoginAction}
                        className="login-button"
                        disabled={loginAttempts >= 3}
                    >
                        <p>Sign In</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default LoginFormPart;
