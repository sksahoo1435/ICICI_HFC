import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./Log-ins.css";
import axios from "axios";
import Papa from "papaparse";
import dropdownImg from '../../../../src/Assets/dropdwonImg.svg';
import { Menu, Dropdown } from "antd";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const LogIns = ({ setActiveTab }) => {
  const [data, setData] = useState([]);
  const [itemEvent, setItemEvent] = useState('All');
  const [eventedData, setEventedData] = useState([]);
  const [sortbyname, setSortByName] = useState('');
  const [sortbyOrder, setSortByOrder] = useState('')
  const [page, setPage] = useState(1);
  const [numRows, setNumRows] = useState(0);

  const pageSize = 500;

  const loginDetails = async (newPage) => {
    try {
      const ApiTofetch = `https://localhost:7062/api/Admin/GetAllUserLogsWithPagination/${pageSize}/${newPage}`;

      const response = await axios.get(ApiTofetch, {
        withCredentials: true,
      });

      console.log("response are", response);

      if (response.status === 200) {
        setData(response.data.data);
        setEventedData(response.data.data);
        setPage(newPage);
        setNumRows(response.data.totalCount)
      } else {
        console.log("API ERROR", response);
      }
    } catch (error) {
      console.log("The API error is", error);
    }
  };

  useEffect(() => {
    loginDetails(page);
  }, []);

  const handleChange = (event, value) => {
    loginDetails(value);
  };


  const handleDownload = () => {
    const csv = Papa.unparse(eventedData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `userLoginDetails.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const items = [
    {
      key: '0',
      label: 'All',
      onClick: () => setItemEvent('All')
    },
    {
      key: '1',
      label: 'Successful',
      onClick: () => setItemEvent('Successful')
    },
    {
      key: '2',
      label: 'Failed',
      onClick: () => setItemEvent('Failed')
    },
    {
      key: '3',
      label: 'Blocked',
      onClick: () => setItemEvent('Blocked')
    },
  ];

  const itemsName = [
    {
      key: '1',
      label: 'A-Z',
      onClick: () => setSortByName('A-Z')
    },
    {
      key: '2',
      label: 'Z-A',
      onClick: () => setSortByName('Z-A')
    },
  ]

  const itemsOrder = [
    {
      key: '1',
      label: 'Ascending',
      onClick: () => setSortByOrder('ASC')
    },
    {
      key: '2',
      label: 'Descending',
      onClick: () => setSortByOrder('DESC')
    },
  ]

  const handleEventStatus = async (selectedEvent) => {
    if (selectedEvent === 'All') {
      setEventedData(data);
    } else {
      try {
        const ApiForFolder = `https://localhost:7062/api/AdminFilter/FilterlogByEvent/${pageSize}/${page}?eventStatus=${selectedEvent}`;

        const response = await axios.get(ApiForFolder, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setEventedData(response.data.data);
        } else {
          console.log('api response', response.status);
        }
      } catch (err) {
        console.log('Error in API', err);
      }
    }
  };

  useEffect(() => { handleEventStatus(itemEvent) }, [itemEvent]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const ApiToFetch = `https://localhost:7062/api/AdminFilter/FilterLogByName/${pageSize}/${page}?sortBy=${sortbyname}`;

        const response = await axios.get(ApiToFetch, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setEventedData(response.data.data);
        } else {
          console.log('API response error', response.status);
        }
      } catch (err) {
        console.log('Error in API', err);
      }
    };

    fetchData();
  }, [sortbyname]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const ApiToFetch = `https://localhost:7062/api/AdminFilter/FilterlogByDate/${pageSize}/${page}?sortByDate=${sortbyOrder}`;

        const response = await axios.get(ApiToFetch, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setEventedData(response.data.data);
        } else {
          console.log('API response error', response.status);
        }
      } catch (err) {
        console.log('Error in API', err);
      }
    };

    fetchData();
  }, [sortbyOrder]);

  
  return (
    <>
      <div className="px-[5vw]" style={{ marginTop: "-2vh" }}>
        <div
          id="top-navs"
          className="flex hover:underline"
          onClick={() => {
            setActiveTab(0);
          }}
          style={{ width: "13vw" }}
        >
          <div>
            <ArrowBackIosIcon style={{ height: "2vh", color: "#063E67" }} />
          </div>
          <div className="back_home_page" style={{ marginTop: "2vh" }}>
            Back To Home Page
          </div>
        </div>

        <div className="table-container_login">
          <table className="table_login">
            <thead className="tableHead_login">
              <tr>
                <th className="py-2 px-4 border">
                  <div style={{ display: 'flex', alignItems: 'center', gap: "2vw" }}>
                    Date
                    <Dropdown overlay={<Menu>{itemsOrder.map(item => (
                      <Menu.Item key={item.key} onClick={item.onClick}>
                        {item.label}
                      </Menu.Item>
                    ))}</Menu>}>
                      <img src={dropdownImg} alt="Dropdown" className="dropdown-icon" />
                    </Dropdown>
                  </div>
                </th>
                <th className="py-2 px-4 border">Time</th>

                <th className="py-2 px-4 border">
                  <div style={{ display: 'flex', alignItems: 'center', gap: "2vw" }}>
                    Username
                    <Dropdown overlay={<Menu>{itemsName.map(item => (
                      <Menu.Item key={item.key} onClick={item.onClick}>
                        {item.label}
                      </Menu.Item>
                    ))}</Menu>}>
                      <img src={dropdownImg} alt="Dropdown" className="dropdown-icon" />
                    </Dropdown>
                  </div>
                </th>

                <th className="py-2 px-4 border">Last Logged In</th>

                <th className="py-2 px-4 border" >
                  <div style={{ display: 'flex', alignItems: 'center', gap: "2vw" }}>
                    Event Status
                    <Dropdown overlay={<Menu>{items.map(item => (
                      <Menu.Item key={item.key} onClick={item.onClick}>
                        {item.label}
                      </Menu.Item>
                    ))}</Menu>}>
                      <img src={dropdownImg} alt="Dropdown" className="dropdown-icon" />
                    </Dropdown>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="tableBody_login">
              {eventedData.map((item) => (
                <tr
                  key={item.id}
                  className={item.id % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="tableBody_login_td">
                    {new Date(item.formattedDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="tableBody_login_td">{item.formattedTime}</td>
                  <td className="tableBody_login_td">{item.username}</td>
                  <td className="tableBody_login_td">
                    {new Date(item.formattedLastLoggedIn).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>

                  <td
                    className={`tableBody_login_td ${item.eventStatus === "Successful"
                      ? "text-green-500"
                      : "text-red-500"
                      }`}
                  >
                    {item.eventStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {numRows > 0 && (
            <div className='paginationNbutton'>
              <div style={{ display: "flex", flexDirection: "row", gap: "1vw", marginTop: "2vh", width: "100%", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ marginTop: "2.5vh", marginLeft: "1vw", fontSize: "1cqw" }}> Rows per Page: {pageSize}</div>
                  <div style={{ marginTop: "2vh" }}>
                    <Stack spacing={1}>
                      <Pagination count={Math.ceil(numRows / pageSize)} page={page} onChange={handleChange} />
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        <div id="buttons" className="my-5">
          <div className="absolute right-0 px-[5vw]">
            <button
              className="border py-2 px-9 mx-2 rounded-full text-white bg-gradient-to-t from-[#E75126] to-[#F8A716]"
              onClick={handleDownload}
            >
              <p style={{ color: "white" }}>Download</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIns;
