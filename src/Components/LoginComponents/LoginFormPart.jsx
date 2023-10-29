import React, { useState } from 'react';

import { json, useNavigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import IconButton from '@mui/material/IconButton';

import VisibilityIcon from '@mui/icons-material/Visibility';

import alertImg from '../../../src/Assets/alertImg.svg';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './loginform.css';

import axios from 'axios';

import { useContext, useEffect } from 'react';

import Statecontext from '../Context/Statecontext';

// import jwt from 'jsonwebtoken';

import { Base64 } from 'js-base64';



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

    const { apiBaseurl, showPopup, setShowPopup } = useContext(Statecontext);

    const [capsLockOn, setCapsLockOn] = useState(false);

    const navigate = useNavigate();

    const secretKey = 'this is my custom Secret key for authnetication';





    const changeVisibility = () => {

        setToggleVisibility(!toggleVisible);

    }

    // const handleCapsLock=(e)=>{

    //     console.log("work");

    //     const keyCode=e.keyCode ||e.which;

    //     const isCapsLockOn=e.getModifierState('CapsLock')

    //     setCapsLockOn(isCapsLockOn);

    // }

    useEffect(() => {

        const handleCapsLock = (e) => {

            console.log("work");



            const isCapsLockOn = e.getModifierState('CapsLock')

            setCapsLockOn(isCapsLockOn);

        };

        document.addEventListener('keydown', handleCapsLock);

        document.addEventListener('keyup', handleCapsLock);

        return () => {

            document.removeEventListener('keydown', handleCapsLock);

            document.removeEventListener('keyup', handleCapsLock);

        };

    }, []);



    const fetchUserName = async () => {

        try {

            const APItoUse = `${apiBaseurl}api/ReportingModule/GetUsername`;



            const response = await axios.get(APItoUse, {

                withCredentials: true,

            });



            if (response.status === 200) {

                sessionStorage.setItem("userId", response.data.username);

                sessionStorage.setItem("userRole", response.data.role);

                sessionStorage.setItem("userDownload", response.data.download);

                sessionStorage.setItem("userUpload", response.data.upload);

            }

        } catch (err) {

            console.log("API Error", err);

        }

    };



    const handleLoginAction = async () => {



        console.log("hit the login button")

        const inputData = {

            "username": userid,

            "password": password

        }



        console.log(" login button to check i/p", inputData, JSON.stringify(inputData))


        // try {

        //     const getuserId = `${apiBaseurl}api/ReportModules/Login`;

        //     // https://localhost:44329/api/ReportModules/Login



        //     console.log("Api to hit get user api", getuserId)

        //     const response = await axios.post(

        //         getuserId,

        //         inputData,

        //         {

        //             withCredentials: true,

        //             headers: {

        //                 'Content-Type': 'application/json'

        //             }

        //         }

        //     );



        //     console.log("check status", getuserId, response, inputData)



        //     if (response.status === 200) {

        //         console.log("data", response.data);

        //         console.log("response", response);

        //         const token = response.data.token;

        //         const parts = token.split('.');

        //         localStorage.setItem("token",token)



        //         // The payload is the second part (index 1)

        //         const encodedPayload = parts[1];



        //         // Decode the base64-encoded payload

        //         const decodedPayload = atob(encodedPayload);



        //         // Parse the JSON payload to get the claims

        //         const claims = JSON.parse(decodedPayload);



        //         // Extract the desired claims

        //         const nameValue = claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

        //         const roleValue = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        //         const uploadValue = claims['Upload'];

        //         const downloadValue = claims['Download'];



        //         sessionStorage.setItem("userId", nameValue);

        //         sessionStorage.setItem("userRole", roleValue);

        //         sessionStorage.setItem("userDownload", downloadValue);

        //         sessionStorage.setItem("userUpload", uploadValue);



        //         console.log("Decoded Token:", claims);

        //         console.log("Name:", nameValue);

        //         console.log("Role:", roleValue);

        //         console.log("Upload:", uploadValue);

        //         console.log("Download:", downloadValue);

        //         navigate("/home");

        //         if (!(userid && password)) {

        //             setOpen(true);

        //         } else if (userid === "" || password === "") {

        //             setOpen(true);

        //         } else {

        //             console.log(response.data.token);



        //             navigate("/home");

        //         }

        //     } else {

        //         setError('Invalid credentials');

        //         if (response.data.username !== userid) {

        //             setUseridError(true);

        //         } else {

        //             setPasswordError(true);

        //         }



        //         setLoginAttempts(loginAttempts + 1);

        //     }

        // } catch (error) {

        //     console.error('Error:', error);

        //     setError('An error occurred');

        //     toast.error("please check the userId & Password.....", { theme: "colored" })

        //     setLoginAttempts(loginAttempts + 1);

        // }

        sessionStorage.setItem("userId", "sunil");
        localStorage.setItem("token", "skkkkkkksllls")

        sessionStorage.setItem("userRole", "Admin");

        sessionStorage.setItem("userDownload", 1);

        sessionStorage.setItem("userUpload", 1);

        navigate("/home")
        setShowPopup(true);

        // setTimeout(() => {
        //     setShowPopup(false);
        // }, 3000);

        //         //fetchUserName()



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

            <ToastContainer />

            <div className="login-container">

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

                    <h3 className="login-header">Sign In</h3>

                    <div className='caps-lock-icon'>
                        {capsLockOn && (
                            <div className="caps-lock-tooltip">

                                <span className="caps-lock-tooltip-text">Caps-Lock On 🔒</span>
                            </div>
                        )}
                    </div>

                </div>


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

                                //onKeyDown={handleCapsLock}

                                className="input-field"

                                placeholder="Enter your Password"

                                style={{ color: "black", paddingLeft: "1vw", fontSize: "1rem", border: error ? '1px solid red' : "1px solid #E2E2E2", backgroundColor: inputHasTextPass ? 'white' : "#e3e0e0" }}

                            />

                            {/* {

                                capsLockOn &&

                                <div className='caps-lock-icon'>Caps-Lock🔒
                                </div>

                            } */}



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

                        <div style={{ display: "flex", height: "3.4vh", marginTop: "-0.5vh", flexDirection: "row", gap: "0.5vw", width: "100%", position: "relative" }}>

                            <img src={alertImg} alt='alert' />

                            <p style={{ fontSize: "0.7rem", color: "red" }}>{`Your Account Has Been Locked Due To Multiple Attempts

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