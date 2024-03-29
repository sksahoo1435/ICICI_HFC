import React, { useState } from 'react'
import grid from "../../../Assets/Tile View Icons.jpg";
import list from "../../../Assets/Component 1.png";
import FileContent from './FileContent/FileContent';
import DownloadDestination from './UploadDownload/Upload/DownloadDestination';
import "./FileView.css"
import CenterDownload from './UploadDownload/Download/CenterDownload';
import { Tooltip } from '@mui/material';

//files are here for navbar
import activeHome from '../../../Assets/Home Active.svg';
import inactiveHome from '../../../Assets/Home Inactive.svg';
import activeManageUser from '../../../Assets/Manage Users Active.svg';
import inactiveManageUser from '../../../Assets/Manage Users Inactive.svg';
import activeLogins from '../../../Assets/Logins active.svg';
import inactiveLogins from '../../../Assets/Logins Inactive.svg';
import activeFileDictionary from '../../../Assets/File Dictionary active.svg'
import inactiveFileDictionary from '../../../Assets/File Dictionary Inactive.svg'
import activeUpload from '../../../Assets/Upload active.svg';
import inactiveUpload from '../../../Assets/Upload Inactive.svg';
import activeDownload from '../../../Assets/Download active.svg';
import inactiveDownload from '../../../Assets/Download Inactive.svg';


const FileView = ({ activeTab, setActiveTab, fileView, setFileView }) => {


  const [gridView, setGridView] = useState(true);
  const [advance, setAdvance] = useState(false);

  let userRole = sessionStorage.getItem("userRole");

  let userDownload = sessionStorage.getItem("userDownload");
  let userUpload = sessionStorage.getItem("userUpload");

  return (
    <div>
      <div className="overalTabs">

        <div className="mainTabs">
          {userRole !== 'User' ? (
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
                <Tooltip title="Explore all folders" arrow enterDelay={1000}>
                  <img src={activeTab === 0 ? activeHome : inactiveHome} alt="" />
                </Tooltip>
              </button>


              {userUpload === '1' ? (<button
                className={
                  activeTab === 5 ? "selectedTabs normalTabs5" : "normalTabs5"
                }
                onClick={() => {
                  setActiveTab(5);
                }}
              >
                <Tooltip title=" Upload a file" arrow enterDelay={1000}>
                  <img src={activeTab === 5 ? activeUpload : inactiveUpload} alt="" />
                </Tooltip>
              </button>) : ""}

              {userDownload === '1' ? (<button
                className={
                  activeTab === 6 ? "selectedTabs normalTabs6" : "normalTabs6"
                }
                onClick={() => {
                  setActiveTab(6);
                }}
              >
                <Tooltip title=" Download custom fields" arrow enterDelay={1000}>
                  <img src={activeTab === 6 ? activeDownload : inactiveDownload} alt="" />
                </Tooltip>
              </button>) : ""}


              <button
                className={
                  activeTab === 1 ? "selectedTabs normalTabs1" : "normalTabs1"
                }
                onClick={() => {
                  setActiveTab(1);
                  setFileView(false);
                }}
              >
                <Tooltip title=" Manage user roles and access" arrow enterDelay={1000}>
                  <img src={activeTab === 1 ? activeManageUser : inactiveManageUser} alt="" />
                </Tooltip>
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
                <Tooltip title=" View all login activities" arrow enterDelay={1000} >
                  <img src={activeTab === 2 ? activeLogins : inactiveLogins} alt="" />
                </Tooltip>
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
                <Tooltip title="View headers of all files" arrow enterDelay={1000}>
                  <img src={activeTab === 3 ? activeFileDictionary : inactiveFileDictionary} alt="" />
                </Tooltip>
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
                <Tooltip title="Explore all folders" arrow enterDelay={1000}>
                  <img src={activeTab === 0 ? activeHome : inactiveHome} alt="" />
                </Tooltip>
              </button>

              {userUpload === '1' ? (<button
                className={
                  activeTab === 5 ? "selectedTabs normalTabs5" : "normalTabs5"
                }
                onClick={() => {
                  setActiveTab(5);
                }}
              >
                <Tooltip title="Upload a file " arrow enterDelay={1000}>
                  <img src={activeTab === 5 ? activeUpload : inactiveUpload} alt="" />
                </Tooltip>
              </button>) : ""}

              {userDownload === '1' ? (<button
                className={
                  activeTab === 6 ? "selectedTabs normalTabs6" : "normalTabs6"
                }
                onClick={() => {
                  setActiveTab(6);
                }}
              >
                <Tooltip title="Download custom fields" arrow enterDelay={1000}>
                  <img src={activeTab === 6 ? activeDownload : inactiveDownload} alt="" />
                </Tooltip>
              </button>) : ""}

            </>
          )}
        </div>

       {activeTab !== 6 && <div className='endingDIv'>
          {!advance && <div className="gridViewDiv">
            <img
              src={gridView ? grid : list} height={50} width={50}
              alt=""
              onClick={() => {
                setGridView(!gridView);
              }}
            />
          </div>
          }
        </div>}
      </div>

      {activeTab === 5 && userUpload === '1' ? (
        <DownloadDestination gridView={gridView} advance={advance} setAdvance={setAdvance} />
      ) : activeTab === 6 && userDownload === '1' ? (
        <CenterDownload advance={advance} setAdvance={setAdvance} setActiveTab={setActiveTab} />
      ) : (
        <FileContent admin={userRole === 'Admin'} gridView={gridView} setGridView={setGridView} />
      )}

    </div>

  )
}

export default FileView
