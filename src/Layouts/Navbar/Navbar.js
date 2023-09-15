import React, { useEffect } from 'react'
import icon from "../../Assets/image 1.png"
import "./Navbar.css"
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import settings from "../../Assets/Vector.png"
import logout from "../../Assets/Vector (1).png"
import downArrow from "../../Assets/Union 2.png";
import axios from 'axios';

const Navbar = () => {
  let navigate = useNavigate();
  const items = [
    {
      key: '1',
      label: <button className=" dropdownButton" onClick={() => { navigate("/settings") }} ><img src={settings} alt="edit" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Settings</button>,

    },
    {
      key: '2',
      label: <button className=" dropdownButton" onClick={() => { navigate("/") }} ><img src={logout} alt="edit" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logout</button>,

    },
  ];
  const fetchUserName = async () =>{
    try{

      const APItoUse = `https://localhost:7062/api/ReportingModule/GetUsername`

      const response = await axios.get(APItoUse,{
        withCredentials:true,
      })
      if(response.status === 200){
        sessionStorage.setItem("userId", response.data.username);
       
      }

    }catch(err){
      console.log("API Error",err)
    }
  }
  


  let userIcon;
  let username;

  const userName = sessionStorage.getItem('userId')
  username = userName === null ? 'shetej':userName
  let splituser = username.split(" ")

  let z = splituser.length - 1

  let f = splituser[0]
  let l = splituser[z]

  userIcon = f[0] + l[0];

  useEffect(()=>{fetchUserName();},[])

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
