import React from "react";
import "./Home.css";
import Input from "@mui/material/Input";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Dropdown } from "antd";
import grid from "../../../Assets/Tile View Icons.jpg";
import list from "../../../Assets/Component 1.png";
import Folder from "../main/FolderView/Folder";
import ManageUser from "../ManageUser/ManageUser";
import LogIns from "../Logins/LogIns";
import downArrow from "../../../Assets/Union 2.svg";
import FilterImg from '../../../Assets/filter.svg'
import FileDictionary from "../FileDictionary/FileDictionary";
import homeImg from '../../../Assets/homeImg.svg';
import homeInactive from '../../../Assets/homeinactive.svg'
import users from '../../../Assets/usersImg.svg';
import usersActive from '../../../Assets/customerActive.svg'
import loginsActive from '../../../Assets/loginsActive.svg';
import logins from '../../../Assets/Vector.svg';
import files from '../../../Assets/akar-icons_file.svg';
import filesactive from '../../../Assets/fileInactive.svg'



const HomeComp = ({ fileView, setFileView, admin, setAdmin, activeTab, setActiveTab, gridView, setGridView, selectDrop, setSelectDrop, selectFilter, setSelectFilter }) => {



  const filterItems = [
    {
      key: '0',
      label: <button className={selectFilter > 0 ? 'cancelButton dropdownButtonSort' : 'vanishButton'} onClick={() => { setSelectFilter(0) }}> {'x'} Clear Options </button>,

    },
    {
      key: '1',
      label: <button className={selectFilter === 1 ? 'selectedButton dropdownButtonSort' : 'dropdownButtonSort'} onClick={() => { setSelectFilter(1) }} >Business Date</button>,

    },
    {
      key: '2',
      label: <button className={selectFilter === 2 ? 'selectedButton dropdownButtonSort' : 'dropdownButtonSort'} onClick={() => { setSelectFilter(2) }} >Active</button>,

    },
    {
      key: '3',
      label: <button style={{ borderBottom: "1px solid #ededed" }} className={selectFilter === 3 ? 'selectedButton dropdownButtonSort' : 'dropdownButtonSort'} onClick={() => { setSelectFilter(3) }} >Inactive</button>,

    },

    // {
    //   key: '5',
    //   label: <button className={admin ? 'dropdownButtonSort' : 'vanishButton'} > {'+'} Add Options </button>,

    // }

  ];
  // Active , Inactive , File Type , Text File , Excel File , JSON file , CSv,Tab 
  const items = [
    {
      key: '0',
      label: <button className={selectDrop > 0 ? 'cancelButton dropdownButtonSort' : 'vanishButton'} onClick={() => { setSelectDrop(0) }}> {'x'} Clear Options </button>,

    },
    {
      key: '1',
      label: <button className={selectDrop === 1 ? 'selectedButton dropdownButtonSort' : 'dropdownButtonSort'} onClick={() => { setSelectDrop(1) }} >Name {'('}A to Z {')'} </button>,

    },
    {
      key: '2',
      label: <button className={selectDrop === 2 ? 'selectedButton dropdownButtonSort' : 'dropdownButtonSort'} onClick={() => { setSelectDrop(2) }} >Name {'('}Z to A {')'} </button>,

    },

    // {
    //   key: '5',
    //   label: <button className={admin ? 'dropdownButtonSort' : 'vanishButton'} > {'+'} Add Options </button>,

    // },

  ];

  return (
    <>
      <div className="overalTabs">
        <div className="mainTabs">
          {admin ? (
            <>
              <button
                className={
                  activeTab === 0 ? "selectedTab normalTab0" : "normalTab0"
                }
                onClick={() => {
                  setActiveTab(0);
                  setFileView(false);
                }}
              >
                <span style={{marginLeft:"-1vw",paddingRight:"0.5vw"}}><img src={activeTab === 0 ?homeImg : homeInactive} alt="home" /></span>
                <span className="button-icon">Home</span>
              </button>

              <button
                className={
                  activeTab === 1 ? "selectedTab normalTab1" : "normalTab1"
                }
                onClick={() => {
                  setActiveTab(1);
                  setFileView(false);
                }}
              >
                <span style={{marginLeft:"-0.5vw",paddingRight:"0.5vw"}}><img src={activeTab === 1 ? usersActive :users} alt="home" /></span>
                <span className="button-icon" style={{marginRight:"-1vw"}}>Manage Users</span>
              </button>


              <button
                className={
                  activeTab === 2 ? "selectedTab normalTab2" : "normalTab2"
                }
                onClick={() => {
                  setActiveTab(2);
                  setFileView(false);
                }}
              >
                <span style={{marginLeft:"-0.5vw",paddingRight:"0.5vw"}}><img src={activeTab === 2 ?loginsActive :logins} alt="home" /></span>
                <span className="button-icon">Logins</span>
              </button>

              <button
                className={
                  activeTab === 3 ? "selectedTab normalTab3" : "normalTab3"
                }
                onClick={() => {
                  setActiveTab(3);
                  setFileView(false);
                }}
              >
                <span style={{marginLeft:"-0.5vw",paddingRight:"0.5vw"}}><img src={activeTab === 3 ?filesactive:files} alt="home" /></span>
                <span className="button-icon" style={{marginRight:"-1vw"}} >File Dictionary</span>
              </button>
            </>
          ) : (
            <>
              <button
                className={
                  activeTab === 0 ? "selectedTab normalTab0" : "normalTab0"
                }
                onClick={() => {
                  setActiveTab(0);
                  setFileView(false);
                }}
              >
                <span style={{marginLeft:"-1vw",paddingRight:"0.5vw"}}><img src={activeTab === 0 ?homeImg : homeInactive} alt="home" /></span>
                <span className="button-icon">Home</span>
              </button>
            </>
          )}
        </div>

        {activeTab === 0 && (
          <>
            <div className="endingDIv">
              <div className="searchDiv">
                <Input
                  disableUnderline={true}
                  className="search-inputforHome"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon className="searchicon" sx={{ color: "#FFA000" }} />
                    </InputAdornment>
                  }
                  placeholder="Enter Text Here"
                  type="text"
                ></Input>
              </div>
              <div className="requestDiv" style={{ height: "5vh" }}>
                <button className="requestAccessBtn">Request Access</button>
              </div>
              <div className="gridViewDiv">
                {/* gridView/listView image */}
                <img
                  src={gridView ? grid : list} height={50} width={50}
                  alt=""
                  onClick={() => {
                    setGridView(!gridView);
                  }}
                />
              </div>
            </div>
          </>
        )}
        {
          (activeTab === 1 || activeTab === 2) && (
            <>
              <div className="endingDIv">
                <div className="searchDiv">
                  <Input
                    disableUnderline={true}
                    className="search-inputforHome"
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon className="searchicon" sx={{ color: "#FFA000" }} />
                      </InputAdornment>
                    }
                    placeholder="Enter Text Here"
                    type="text"
                  ></Input>
                </div>

                <div style={{ marginLeft: "0vw", marginTop: "0vh", maxHeight: "5vh", height: "4.5vh" }}>
                  <Dropdown menu={{
                    items,
                  }}
                    trigger={['click']}

                  >
                    <div className='sortBtn' onClick={(e) => { e.preventDefault() }}
                      style={{ width: "6.5vw", maxHeight: "5vh", height: "5vh", border: "1px solid #36556B", }}>
                      <p style={{ color: "#36556B", fontSize: "0.9cqw" }}>Sort By</p>
                      <img src={downArrow} alt="" style={{ paddingLeft: "-1vw" }} /> </div>
                  </Dropdown>
                </div>

                <div style={{ marginLeft: "-2vw", marginTop: "0vh", height: "4vh", }} >
                  <Dropdown menu={{
                    items: filterItems
                  }}
                    trigger={['click']}

                  >
                    <div className='sortBtn' onClick={(e) => { e.preventDefault() }}
                      style={{ maxHeight: "5vh", height: "5vh", border: "1px solid #36556B", width: "8vw" }} >
                      <img src={FilterImg} alt="" style={{ paddingLeft: "0vw" }} />
                      <p style={{ color: "#36556B", fontSize: "0.9cqw" }}>Filters</p>
                      <img src={downArrow} alt="" style={{ paddingLeft: "-2vw" }} />
                    </div>
                  </Dropdown>
                </div>
              </div>
            </>
          )
        }
      </div>
      {activeTab === 0 && <Folder gridView={gridView} setGridView={setGridView} fileView={fileView} setFileView={setFileView} />}
      {activeTab === 1 && <ManageUser gridView={gridView} setGridView={setGridView} setActiveTab={setActiveTab} />}
      {activeTab === 2 && <LogIns gridView={gridView} setGridView={setGridView} setActiveTab={setActiveTab} />}
      {activeTab === 3 && <FileDictionary gridView={gridView} setGridView={setGridView} setActiveTab={setActiveTab} />}

    </>
  );
};

export default HomeComp;


