import React, { useState } from 'react'
import Input from "@mui/material/Input";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import grid from "../../../Assets/Tile View Icons.jpg";
import list from "../../../Assets/Component 1.png";
import FileContent from './FileContent/FileContent';
import DownloadDestination from './UploadDownload/Upload/DownloadDestination';
// import Navbar from "../../../Assets/Nav Bar.svg";
import normalHome from "../../../Assets/Home Inactive.svg";
import homeActive from "../../../Assets/Home Active.svg";

import normalUpload from "../../../Assets/Upload Inactive.svg";
import uploadActive from "../../../Assets/Upload active.svg";

import normalDownload from "../../../Assets/Download Inactive.svg";
import downloadActive from "../../../Assets/Download active.svg";

import normalManageUser from "../../../Assets/Manage Users Inactive.svg";
import manageUSerActive from "../../../Assets/Manage Users Active.svg";

import normalLogins from "../../../Assets/Logins Inactive.svg";
import loginsActive from "../../../Assets/Logins active.svg";

import normalFileDictionary from "../../../Assets/File Dictionary Inactive.svg";
import FileDictionaryActive from "../../../Assets/File Dictionary active.svg";
import "./FileView.css"
import CenterDownload from './UploadDownload/Download/CenterDownload';
import Folder from '../main/FolderView/Folder';


const FileView = ({ activeTab, setActiveTab, fileView, setFileView }) => {
  const [admin, setAdmin] = useState(true);
  const [gridView, setGridView] = useState(true);
  const [advance, setAdvance] = useState(false);

  return (
    <div>
      <div className="overalTabs">
        {console.log("check admin and set admin", setAdmin, admin)}
        <div className="mainTabs">
          {admin ? (
            <>
              <button
                className={
                  activeTab === 0 ? "selectedTab normalTab1" : "normalTab1"
                }
                onClick={() => {
                  setActiveTab(0);
                  setFileView(false);
                }}
              >

                <img src={activeTab === 0 ? homeActive : normalHome} alt="" />
              </button>


              <button
                className={
                  activeTab === 5 ? "selectedTab normalTab5" : "normalTab5"
                }
                onClick={() => {
                  setActiveTab(5);
                }}
              >

                <img src={activeTab === 5 ? uploadActive : normalUpload} alt="" />
              </button>

              <button
                className={
                  activeTab === 6 ? "selectedTab normalTab6" : "normalTab6"
                }
                onClick={() => {
                  setActiveTab(6);
                }}
              >

                <img src={activeTab === 6 ? downloadActive : normalDownload} alt="" />
              </button>


              <button
                className={
                  activeTab === 1 ? "selectedTab normalTab20" : "normalTab20"
                }
                onClick={() => {
                  setActiveTab(1);
                  setFileView(false);
                }}
              >
                <img src={activeTab === 1 ? manageUSerActive : normalManageUser} alt="" />

              </button>
              <button
                className={
                  activeTab === 2 ? "selectedTab normalTab30" : "normalTab30"
                }
                onClick={() => {
                  setActiveTab(2);
                  setFileView(false);
                }}
              >

                <img src={activeTab === 2 ? loginsActive : normalLogins} alt="" />

              </button>
              <button
                className={
                  activeTab === 3 ? "selectedTab normalTab40" : "normalTab40"
                }
                onClick={() => {
                  setActiveTab(3);
                  setFileView(false);
                }}
              >

                <img src={activeTab === 3 ? FileDictionaryActive : normalFileDictionary} alt="" />

              </button>
            </>
          ) : (
            <>
              <button
                className={
                  activeTab === 0 ? "selectedTab normalTab1" : "normalTab1"
                }
                onClick={() => {
                  setActiveTab(0);
                  setFileView(false);
                }}
              >

                <img src={activeTab === 0 ? homeActive : normalHome} alt="" />
              </button>
            </>
          )}
        </div>
        <div className='endingDIv'>
          <div className="searchDiv">
            <Input
              disableUnderline={true}
              className="search-inputforHome"
              sx={{ marginLeft: "-2vw" }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon className="searchicon" sx={{ color: "#FFA000" }} />
                </InputAdornment>
              }
              placeholder="Enter Text Here"
              type="text"
            ></Input>
          </div>
          {!advance && <div className="gridViewDiv">
            {/* gridView/listView image */}
            <img
              src={gridView ? grid : list}
              alt=""
              onClick={() => {
                setGridView(!gridView);
              }}
            />
          </div>
          }
        </div>
      </div>

      {/* {activeTab === 0 ? <Folder/> : activeTab === 5 ? (
        <DownloadDestination gridView={gridView} advance={advance} setAdvance={setAdvance} />
      ) : activeTab === 6 ? (
        <CenterDownload gridView={gridView} advance={advance} setAdvance={setAdvance} setActiveTab={setActiveTab} />
      ) : (
        <FileContent admin={admin} gridView={gridView} />
      )} */}

      {activeTab === 5 ? (
        <DownloadDestination gridView={gridView} advance={advance} setAdvance={setAdvance} />
      ) : activeTab === 6 ? (
        <CenterDownload gridView={gridView} advance={advance} setAdvance={setAdvance} setActiveTab={setActiveTab} />
      ) : (
        <FileContent admin={admin} gridView={gridView} />
      )}

    </div>

  )
}

export default FileView
