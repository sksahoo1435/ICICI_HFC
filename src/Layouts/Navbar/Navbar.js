import React, { useEffect } from 'react'
import icon from "../../Assets/image 1.png"
import "./Navbar.css"
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import settings from "../../Assets/Vector.png"
import logout from "../../Assets/Vector (1).png"
import downArrow from "../../Assets/Union 2.png";
import axios from 'axios';
import { useContext ,useState} from 'react';
import Statecontext from '../../Components/Context/Statecontext';

const Navbar = () => {
  let navigate = useNavigate();
  const { apiBaseurl } = useContext(Statecontext);
  const [logoutTimer, setLogoutTimer] = useState(null);

  const logoutHandler=()=>{
    localStorage.setItem("token","");
    navigate("/")
  }
  const items = [
    {
      key: '1',
      label: <button className=" dropdownButton" onClick={() => { navigate("/settings") }} ><img src={settings} alt="edit" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Settings</button>,

    },
    {
      key: '2',
      label: <button className=" dropdownButton" onClick={logoutHandler} ><img src={logout} alt="edit" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout</button>,

    },
  ];

  const startLogoutTimer = () => {
    const timer = setTimeout(() => {
      // Logout the user when the timer expires
      handleLogout();
    }, 15 * 60 * 1000); // 15 minutes in milliseconds
    setLogoutTimer(timer);
  };

  const handleLogout = () => {
    // Clear the timer and do the logout
    clearTimeout(logoutTimer);
    localStorage.setItem("token", "");
    navigate('/'); // Replace with the actual logout route
  };
  const fetchUserName = async () => {

    startLogoutTimer();
    sessionStorage.getItem("userId")
  }
  if (localStorage.getItem("token") === "" || localStorage.getItem("token") === null) {
    navigate("/")
  }


  let userIcon;
  let username;

  const userName = sessionStorage.getItem('userId')
  username = userName === null ? 'shetej' : userName;
  let splituser = username.split("")
  console.log(splituser)
  //let z = splituser.length - 1

  let f = splituser[0]
  let l = splituser[1]

  userIcon = f[0] + l[0];

  useEffect(() => { fetchUserName(); }, [])

  return (
    <>
      <div className='Navbar'>
        <div className='startImage'>
          <img src={icon} alt='spotify' />
        </div>
        <div className='endDiv'>
          <Dropdown menu={{
            items,
          }}
            trigger={['click']}

          >

            <span className='username'>
              <span className='cirlceuser'> <span className='circletext'>{userIcon}</span> </span>
              <p className='usertext'><span>{username}</span> <span><img src={downArrow} alt="" /></span> </p>

            </span>


          </Dropdown>
        </div>
      </div>
    </>
  )
}

export default Navbar
