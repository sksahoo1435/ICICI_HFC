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


const ManageUser = ({ setActiveTab }) => {
  const [data, setData] = useState([]);
  const [savedata, setSaveData] = useState([]);
  const [sortedData, setSortedData] = useState([])
  const [recall, setRecall] = useState('false');
  const [viewModalData, setViewModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortbyname, setSortByName] = useState('');
  const [sortbyOrder, setSortByOrder] = useState('')

  const fetchUsersToManage = async () => {
    try {
      const userApi = `https://localhost:7062/api/Admin/UserManger`;
      const response = await axios.get(userApi, {
        withCredentials: true,
      });
      const initialData = response.data.map((item) => ({ ...item, isChecked: false }));
      setData(initialData);
      setSaveData(initialData);
      setSortedData(initialData)
    } catch (error) {
      console.error('Error fetching data from api:', error);
    }
  };

  const updateUserAccess = async (item) => {

    try {
      const userApi = `https://localhost:7062/api/Admin/UpdateUserManage`;
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
        toast.success(`${item.username} access updated successfuly..`, { theme: "colored" })
      } else {
        toast.error(`Something went wrong..`, { theme: "colored" })
      }
      console.log('Updated user access:', response);



    } catch (error) {
      console.error('Error updating user access:', error);
      toast.error(`Something went wrong..`, { theme: "colored" })
    }
  };

  useEffect(() => {
    fetchUsersToManage();
  }, []);

  useEffect(() => {
    fetchUsersToManage();
  }, [recall]);

  useEffect(() => {
    for (const item of savedata) {
      const originalItem = data.find((d) => d.username === item.username);
      if (
        originalItem.upload !== item.upload ||
        originalItem.download !== item.download
      ) {
        updateUserAccess(item);
      }
    }
  }, [savedata, data, sortedData]);

  const handleCheckboxChange = (item, checkValue) => {
    setSaveData((prevData) => {
      const updatedData = prevData.map((prevItem) =>
        prevItem.username === item.username
          ? { ...prevItem, [checkValue]: !prevItem[checkValue] }
          : prevItem
      );
      return updatedData;
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

    const updatedUserObjects = data.map(removeIsCheckedProperty);

    const csv = Papa.unparse(updatedUserObjects);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `UserAccessDetails.csv`;
    a.click();
    URL.revokeObjectURL(url);

  }

  const handleView = (item) => {
    setViewModalData(item);
    setModalOpen(true);
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        const ApiToFetch = `https://localhost:7062/api/AdminFilter/UserMangerFilterByName?sortingOrder=${sortbyname}`;

        const response = await axios.get(ApiToFetch, {
          withCredentials: true,
        });
        if (response.status === 200) {

          setSortedData(response.data);
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
        const ApiToFetch = `https://localhost:7062/api/AdminFilter/UserMangerFilterByDate?sortingOrder=${sortbyOrder}`;

        const response = await axios.get(ApiToFetch, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setSortedData(response.data);
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

        <div

          className="tablecontent"
        >
          <table className="table">
            <thead className="tableHead">
              <tr>
                <th className="tableHeadTh">
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
                <th className="tableHeadTh">
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
                <th className="tableHeadTh">Access</th>
              </tr>
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

            <tbody className='tableBody'>
              {sortedData.map((item) => (

                <tr
                  key={item.id}
                  className={item.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  <td className="tableBodyTd">{item.username}</td>

                  <td className="tableBodyTd">{new Date(item.lastLoggedIn).toLocaleDateString(
                    "en-GB"
                  )}</td>
                  <td className="tableBodyTdSubdiv">
                    <span>

                      <button htmlFor={`view-${item.username}`} onClick={() => handleView(item)} ><p>{`View  >`}</p></button>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        id={`upload-${item.username}`}
                        className="mr-2"
                        checked={savedata.find((d) => d.username === item.username).upload}
                        onChange={() => handleCheckboxChange(item, 'upload')}
                      />
                      <label htmlFor={`upload-${item.username}`}>Upload</label>
                    </span>
                    <span>
                      <input
                        type="checkbox"
                        id={`download-${item.username}`}
                        className="mr-2"
                        checked={savedata.find((d) => d.username === item.username).download}
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
