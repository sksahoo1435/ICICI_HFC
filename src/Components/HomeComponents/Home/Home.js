import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Input from "@mui/material/Input";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import grid from "../../../Assets/Tile View Icons.jpg";
import list from "../../../Assets/Component 1.png";
import Folder from "../main/FolderView/Folder";
import ManageUser from "../ManageUser/ManageUser";
import LogIns from "../Logins/LogIns";
import FileDictionary from "../FileDictionary/FileDictionary";
import { Tooltip } from "@mui/material";
import axios from "axios";

import activeHome from '../../../Assets/Home Active.svg';
import inactiveHome from '../../../Assets/Home Inactive.svg';
import activeManageUser from '../../../Assets/Manage Users Active.svg';
import inactiveManageUser from '../../../Assets/Manage Users Inactive.svg';
import activeLogins from '../../../Assets/Logins active.svg';
import inactiveLogins from '../../../Assets/Logins Inactive.svg';
import activeFileDictionary from '../../../Assets/File Dictionary active.svg'
import inactiveFileDictionary from '../../../Assets/File Dictionary Inactive.svg'
import Statecontext from "../../Context/Statecontext";
import FileModal from "../FileView/FIleModal/FileModal";

const HomeComp = ({
  fileView,
  setFileView,
  admin,
  setAdmin,
  activeTab,
  setActiveTab,
  gridView,
  setGridView,
}) => {
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { filesinFolder, setFileNameTosend, filesinsearch, setFilesinSearch } = useContext(Statecontext);

  let userName = sessionStorage.getItem("userId");

  const fetchFilesBySearch = async (searchText) => {
    if (searchText === "") {
      setFilesinSearch([]);
    } else {
      try {
        const apiToFetch = `https://localhost:7062/api/ReportingModuleFilter/GetGlobalFilenames?username=${userName}&searchString=${searchText}`;
        const response = await axios.get(apiToFetch, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setFilesinSearch(response.data);
        } else {
          console.log("Something went wrong", response);
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    }
  };

  const fetchUserName = async () => {
    try {
      const APItoUse = `https://localhost:7062/api/ReportingModule/GetUsername`;

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

  let userRole = sessionStorage.getItem("userRole");

  useEffect(() => {
    fetchUserName();
  }, []);

  useEffect(() => {
    fetchFilesBySearch(searchText);
  }, [searchText]);

  console.log("files after search", filesinsearch);

  const handleDropdownItemClick = (file) => {
    setSelectedOption(file);
    setIsDropdownOpen(false); // Close the dropdown when an item is clicked
    console.log("Selected option:", file);
  };

  return (
    <>
      <div className="overalTabs">

        <FileModal modalOpen={openModal} setModalOpen={() => { setOpenModal(false) }} />

        <div className="mainTabs">
          {userRole !== "User" ? (
            <>
              <Tooltip title="Explore all folders" arrow enterDelay={1000}>
                <button
                  className={
                    activeTab === 0 ? "selectedTab normalTab0" : "normalTab0"
                  }
                  onClick={() => {
                    setActiveTab(0);
                    setFileView(false);
                  }}
                >
                  <img
                    src={activeTab === 0 ? activeHome : inactiveHome}
                    alt=""
                  />
                </button>
              </Tooltip>

              <Tooltip
                title="Manage user roles and access"
                arrow
                enterDelay={1000}
              >
                <button
                  className={
                    activeTab === 1 ? "selectedTab normalTab1" : "normalTab1"
                  }
                  onClick={() => {
                    setActiveTab(1);
                    setFileView(false);
                  }}
                >
                  <img
                    src={
                      activeTab === 1 ? activeManageUser : inactiveManageUser
                    }
                    alt=""
                  />
                </button>
              </Tooltip>

              <Tooltip
                title="View all login activities"
                arrow
                enterDelay={1000}
              >
                <button
                  className={
                    activeTab === 2 ? "selectedTab normalTab2" : "normalTab2"
                  }
                  onClick={() => {
                    setActiveTab(2);
                    setFileView(false);
                  }}
                >
                  <img
                    src={activeTab === 2 ? activeLogins : inactiveLogins}
                    alt=""
                  />
                </button>
              </Tooltip>

              <Tooltip
                title="View headers of all files"
                arrow
                enterDelay={1000}
              >
                <button
                  className={
                    activeTab === 3 ? "selectedTab normalTab3" : "normalTab3"
                  }
                  onClick={() => {
                    setActiveTab(3);
                    setFileView(false);
                  }}
                >
                  <img
                    src={
                      activeTab === 3
                        ? activeFileDictionary
                        : inactiveFileDictionary
                    }
                    alt=""
                  />
                </button>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Explore all folders" arrow enterDelay={1000}>
                <button
                  className={
                    activeTab === 0 ? "selectedTab normalTab0" : "normalTab0"
                  }
                  onClick={() => {
                    setActiveTab(0);
                    setFileView(false);
                  }}
                >
                  <img
                    src={activeTab === 0 ? activeHome : inactiveHome}
                    alt=""
                  />
                </button>
              </Tooltip>
            </>
          )}
        </div>

        {(activeTab === 0 || activeTab === 1 || activeTab === 2) && (
          <>
            <div className="endingDIv">
              <div className="searchDiv">
                <div className="search-inputforHome">
                  <Input
                    disableUnderline={true}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon
                          className="searchicon"
                          sx={{ color: "#FFA000" }}
                        />
                      </InputAdornment>
                    }
                    placeholder="Enter Text Here"
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onClick={() => setIsDropdownOpen(true)} // Open the dropdown when clicking the input
                  ></Input>
                  {isDropdownOpen && filesinsearch.length > 0 && (
                    <div className="search-dropdown">
                      {filesinsearch.map((file, index) => (
                        <div
                          key={index}
                          className="search-dropdown-item"
                          onClick={() => { handleDropdownItemClick(file); setFileNameTosend(file); setFileNameTosend(file); setOpenModal(true); }}
                        >
                          {file}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {userRole === "User" ? (
                  <div className="requestDiv" style={{ height: "5vh", marginTop: "2vh" }}>
                    <button className="requestAccessBtn">Request Access</button>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="gridViewDiv">
                <img
                  src={gridView ? grid : list}
                  height={50}
                  width={50}
                  alt=""
                  onClick={() => {
                    setGridView(!gridView);
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {activeTab === 0 && (
        <Folder
          gridView={gridView}
          setGridView={setGridView}
          fileView={fileView}
          setFileView={setFileView}
        />
      )}
      {activeTab === 1 && (
        <ManageUser gridView={gridView} setGridView={setGridView} setActiveTab={setActiveTab} />
      )}
      {activeTab === 2 && (
        <LogIns gridView={gridView} setGridView={setGridView} setActiveTab={setActiveTab} />
      )}
      {activeTab === 3 && (
        <FileDictionary gridView={gridView} setGridView={setGridView} setActiveTab={setActiveTab} />
      )}
    </>
  );
};

export default HomeComp;
