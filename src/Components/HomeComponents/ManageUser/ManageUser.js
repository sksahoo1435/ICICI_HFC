import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '../ManageUser/ManageUser.css';
import axios from 'axios';
import Papa from 'papaparse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewModal from './ViewModal';
import dropdownImg from '../../../../src/Assets/dropdwonImg.svg';
import { Menu, Dropdown } from "antd";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useContext } from 'react';
import Statecontext from '../../Context/Statecontext';
import { Tooltip } from "@mui/material";


const ManageUser = ({ setActiveTab }) => {
  const [data, setData] = useState([]);
  const [savedata, setSaveData] = useState([]);
  const [sortedData, setSortedData] = useState([])
  const [recall, setRecall] = useState('false');
  const [viewModalData, setViewModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortbyname, setSortByName] = useState('');
  const [sortbyOrder, setSortByOrder] = useState('');
  const [page, setPage] = useState(1);
  const [numRows, setNumRows] = useState(0);
  const { apiBaseurl } = useContext(Statecontext);
  let [updatesvale, setUpdateVal] = useState('');

  const pageSize = 500;

  const fetchUsersToManage = async (newPage) => {
    try {
      const userApi = `${apiBaseurl}api/Admin/manageuserwithpagination/${pageSize}/${newPage}`;
      const response = await axios.get(userApi, {
        withCredentials: true,
      });

      const initialData = response.data.data.map((item) => ({ ...item, isChecked: false }));
      setData(initialData);
      setSaveData(initialData);
      setSortedData(initialData);
      setNumRows(response.data.totalCount);
      setPage(newPage);
    } catch (error) {
      console.error('Error fetching data from api:', error);
    }
  };

  let userName = sessionStorage.getItem("userId");
  const uploadDownloadLogs = async (user, action) => {
    const mailDatasTosend = {
      "username": user,
      "action": `${action} Access updated - ${user}`,

    }
    try {
      const ApiTofetch = `${apiBaseurl}api/UsersLogs/AdminAction`;
      const response = await axios.post(ApiTofetch, mailDatasTosend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log("user download details", response)
      } else {
        console.log("API ERROR", response);
      }
    } catch (error) {
      console.log("The API error is", error);
    }
  }


  const sendMail = async () => {

    const mailDatasTosend = {
      "to": userName,
      "subject": "string",
      "body": "string"
    }
    try {
      const ApiTofetch = `${apiBaseurl}api/Email/SendEmail`;

      const response = await axios.post(ApiTofetch, mailDatasTosend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("response send mails", response);

      if (response.status === 200) {
        console.log("send mails", response)
      } else {
        console.log("API ERROR", response);
      }
    } catch (error) {
      console.log("The API error is", error);
    }
  }



  const userLogs = async () => {
    const mailDatasTosend = {
      "username": userName,
      "action": "Download",
      "downloadUploadFile": "User Access"
    }
    try {
      const ApiTofetch = `${apiBaseurl}api/UsersLogs/UserAction`;
      const response = await axios.post(ApiTofetch, mailDatasTosend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log("user download details", response)
      } else {
        console.log("API ERROR", response);
      }
    } catch (error) {
      console.log("The API error is", error);
    }
  }


  const handleChange = (event, value) => {
    fetchUsersToManage(value);
  };

  const updateUserAccess = async (item, updatedfield) => {

    try {
      const userApi = `${apiBaseurl}api/Admin/UpdateUserManage`;
      const response = await axios.post(
        userApi,
        {
          username: item.username,
          upload: item.upload ? 1 : 0,
          download: item.download ? 1 : 0,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 204 || response.status === 200) {
        console.log("some response", updatedfield)
        toast.success(`Access Successfully Updated For ${item.username} `, { theme: "colored" })
        setUpdateVal("")
        //  uploadDownloadLogs(item.username,)
      } else {
        toast.error(`Something went wrong..`, { theme: "colored" })
      }
    } catch (error) {
      console.error('Error updating user access:', error);
      toast.error(`Something went wrong..`, { theme: "colored" })
    }
  };

  useEffect(() => {
    fetchUsersToManage(page);
  }, []);

  useEffect(() => {
    fetchUsersToManage(page);
  }, [recall]);

  useEffect(() => {

    for (const item of savedata) {
      const originalItem = sortedData.find((d) => d.username === item.username);
      // console.log("checks....",item.upload, item.download)
      // let updatesvale = item.upload === true ? 'upload' : item.upload === false ? 'upload' : 'download';

      // if (originalItem.upload !== item.upload) {
      //   setUpdateVal('Upload')
      // } else {
      //   setUpdateVal('Download')
      // }

      if (
        originalItem.upload !== item.upload ||
        originalItem.download !== item.download
      ) {

        updateUserAccess(item, updatesvale);
      }
    }
  }, [savedata, data, sortedData]);

  const handleCheckboxChange = (item, checkValue) => {
    setUpdateVal(checkValue)
    setSaveData((prevData) => {
      const updatedData = prevData.map((prevItem) =>
        prevItem.username === item.username
          ? { ...prevItem, [checkValue]: !prevItem[checkValue] }
          : prevItem
      );
      return updatedData.map(({ isChecked, ...rest }) => rest);
    });
  };


  const handleSave = async () => {
    setRecall(true)
    toast.success("Items are saved successfully...!", { theme: "colored", })
  }


  const handleDownload = () => {
    const removeIsCheckedProperty = (sortedData) => {
      const { isChecked, ...updatedUserObject } = sortedData;
      return updatedUserObject;

    };

    const updatedUserObjects = data.map((item) => {
      return {
        ...removeIsCheckedProperty(item), // Remove isChecked property
        upload: item.upload ? "YES" : "NO", // Convert 1 to YES and 0 to NO for upload
        download: item.download ? "YES" : "NO", // Convert 1 to YES and 0 to NO for download
      };
    });

    const csv = Papa.unparse(updatedUserObjects);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UserAccessDetails.csv`;
    a.click();
    userLogs();
    sendMail();

    URL.revokeObjectURL(url);
  };


  const handleView = (item) => {
    setViewModalData(item);
    setModalOpen(true);
  }

  useEffect(() => {

    const fetchData = async () => {

      try {
        const ApiToFetch = `${apiBaseurl}api/AdminFilter/UserMangerFilterByName/${pageSize}/${page}?sortBy=${sortbyname}`;

        const response = await axios.get(ApiToFetch, {
          withCredentials: true,
        });
        if (response.status === 200) {
          const initialData = response.data.data.map((item) => ({ ...item, isChecked: false }));
          setSortedData(response.data.data);
          setSaveData(initialData);
        } else {
          console.log('API response error', response.status);
        }
      } catch (err) {
        console.log('Error in API', err);
      }
    };

    fetchData();
  }, [sortbyname]);

  console.log("----->", sortedData)

  useEffect(() => {

    const fetchData = async () => {
      try {
        const ApiToFetch = `${apiBaseurl}api/AdminFilter/UserMangerFilterByDate/${pageSize}/${page}?sortingOrder=${sortbyOrder}`;

        const response = await axios.get(ApiToFetch, {
          withCredentials: true,
        });

        if (response.status === 200) {
          const initialData = response.data.data.map((item) => ({ ...item, isChecked: false }));
          setSortedData(response.data.data);
          setSaveData(initialData);
        } else {
          console.log('API response error', response.status);
        }
      } catch (err) {
        console.log('Error in API', err);
      }
    };

    fetchData();
  }, [sortbyOrder]);

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

  return (
    <>
      <div className="px-[5vw]">
        <div
          id="top-navs"
          className="flex hover:underline"
          style={{ width: "13vw" }}
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
        <ToastContainer />

        <div className="tablecontent_manageuser" >

          <div className="tablecontent_manageuser_inner">

            <table className="tablemanageuser">

              <thead className="tableHeadmanageuser">

                <th className="tableHeadmanageuserTh">
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
                <th className="tableHeadmanageuserTh">
                  <div style={{ display: 'flex', alignItems: 'center', gap: "2vw" }}>
                    Last Logged In
                    <Dropdown overlay={<Menu>{itemsOrder.map(item => (
                      <Menu.Item key={item.key} onClick={item.onClick}>
                        {item.label}
                      </Menu.Item>
                    ))}</Menu>}>
                      <img src={dropdownImg} alt="Dropdown" className="dropdown-icon" />
                    </Dropdown>
                  </div>
                </th>
                <th className="tableHeadmanageuserTh">Access</th>

              </thead>

              {modalOpen && (
                <div className="overlay open">
                  <ViewModal
                    data={viewModalData}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                  />
                </div>
              )}

              <tbody className='tableBodyManageuser'>
                {sortedData.map((item) => (

                  <tr
                    key={item.id}
                    className={item.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="tableBodyManageuserTd">{item.username}</td>

                    <td className="tableBodyManageuserTd">{new Date(item.lastloggedin).toLocaleDateString(
                      "en-GB"
                    )}</td>
                    <td className="tableBodyManageuserTdSubdiv">
                      <Tooltip title="Manage the tables that the user can view" arrow enterDelay={1000}>
                        <span>

                          <button htmlFor={`view-${item.username}`} onClick={() => handleView(item)} ><p>{`View`}</p></button>
                        </span>
                      </Tooltip>
                      <span>
                        <input
                          type="checkbox"
                          id={`upload-${item.username}`}
                          className="mr-2"
                          checked={savedata.find((d) => d.username === item.username)?.upload || false}
                          onChange={() => handleCheckboxChange(item, 'upload')}
                        />
                        <label htmlFor={`upload-${item.username}`}>upload</label>
                      </span>
                      <span>
                        <input
                          type="checkbox"
                          id={`download-${item.username}`}
                          className="mr-2"
                          checked={savedata.find((d) => d.username === item.username)?.download || false}
                          onChange={() => handleCheckboxChange(item, 'download')}
                        />
                        <label htmlFor={`download-${item.username}`}>Download</label>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

        <div>
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
          <div className="absolute right-0 px-[5vw]" style={{ display: "flex" }} >
            <button className="border-2 font-semibold border-[#F36523] text-[#F36523] py-2 px-4 mx-2 rounded-full"
              onClick={handleDownload}
            >
              <p className='buttonsDownload'>Download</p>
            </button>
            <button className="border py-2 px-9 mx-2 rounded-full text-white bg-gradient-to-t from-[#E75126] to-[#F8A716]"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default ManageUser;
