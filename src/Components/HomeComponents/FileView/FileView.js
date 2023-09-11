import React, { useState } from 'react'
import Input from "@mui/material/Input";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import grid from "../../../Assets/Tile View Icons.jpg";
import list from "../../../Assets/Component 1.png";
import FileContent from './FileContent/FileContent';
import DownloadDestination from './UploadDownload/Upload/DownloadDestination';
import "./FileView.css"
import CenterDownload from './UploadDownload/Download/CenterDownload';

//images of the button

import homeImg from '../../../Assets/homeImg.svg';
import homeInactive from '../../../Assets/homeinactive.svg'
import users from '../../../Assets/usersImg.svg';
import usersActive from '../../../Assets/customerActive.svg';
import loginsActive from '../../../Assets/loginsActive.svg';
import logins from '../../../Assets/Vector.svg';
import files from '../../../Assets/akar-icons_file.svg';
import filesactive from '../../../Assets/fileInactive.svg';


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
                  activeTab === 0 ? "selectedTabs normalTabs0" : "normalTabs0"
                }
                onClick={() => {
                  setActiveTab(0);
                  setFileView(false);
                }}
              >
                <span style={{ marginLeft: "-1vw", paddingRight: "0.5vw" }}><img src={activeTab === 0 ? homeImg : homeInactive} alt="home" /></span>
                <span className="button-icon">Home</span>
              </button>


              <button
                className={
                  activeTab === 5 ? "selectedTabs normalTabs5" : "normalTabs5"
                }
                onClick={() => {
                  setActiveTab(5);
                }}
              >
                <span className="button-icon">Upload</span>

              </button>

              <button
                className={
                  activeTab === 6 ? "selectedTabs normalTabs6" : "normalTabs6"
                }
                onClick={() => {
                  setActiveTab(6);
                }}
              >

                <span className="button-icon">Download</span>
              </button>


              <button
                className={
                  activeTab === 1 ? "selectedTabs normalTabs1" : "normalTabs1"
                }
                onClick={() => {
                  setActiveTab(1);
                  setFileView(false);
                }}
              >
                <span style={{ marginLeft: "-0.5vw", paddingRight: "0.5vw" }}><img src={activeTab === 1 ? usersActive : users} alt="home" /></span>
                <span className="button-icon" style={{ marginRight: "-1vw" }}>Manage Users</span>
              </button>


              <button
                className={
                  activeTab === 2 ? "selectedTabs normalTabs2" : "normalTabs2"
                }
                onClick={() => {
                  setActiveTab(2);
                  setFileView(false);
                }}
              >
                <span style={{ marginLeft: "-0.5vw", paddingRight: "0.5vw" }}><img src={activeTab === 2 ? loginsActive : logins} alt="home" /></span>
                <span className="button-icon">Logins</span>
              </button>

              <button
                className={
                  activeTab === 3 ? "selectedTabs normalTabs3" : "normalTabs3"
                }
                onClick={() => {
                  setActiveTab(3);
                  setFileView(false);
                }}
              >
                <span style={{ marginLeft: "-0.5vw", paddingRight: "0.5vw" }}><img src={activeTab === 3 ? filesactive : files} alt="home" /></span>
                <span className="button-icon" style={{ marginRight: "-1vw" }} >File Dictionary</span>
              </button>
            </>
          ) : (
            <>
              <button
                className={
                  activeTab === 0 ? "selectedTabs normalTabs0" : "normalTabs0"
                }
                onClick={() => {
                  setActiveTab(0);
                  setFileView(false);
                }}
              >
                <span style={{ marginLeft: "-1vw", paddingRight: "0.5vw" }}><img src={activeTab === 0 ? homeImg : homeInactive} alt="home" /></span>
                <span className="button-icon">Home</span>
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
