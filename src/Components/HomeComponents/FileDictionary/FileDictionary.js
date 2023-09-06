import React, { useState } from "react";
import "./FileDictionary.css";
import Input from "@mui/material/Input";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import downArrow from "../../../Assets/Union 2.svg";
import { Collapse } from "antd";
import { Dropdown } from "antd";

const FileDictionary = () => {
  const [datas, setDatas] = useState([
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
    { val: "22TGHB-KML" },
  ]);

  const dropcontent = [
    {
      title: "Agreement No.",
    },
    {
      title: "Agreement No.",
    },
    {
      title: "Agreement No.",
    },
    {
      title: "Agreement No.",
    },
  ];

  const collapseEle = [
    {
      key: "1",
      label: "Cibil Report",
      children: (
        <div>
          {dropcontent.map((item) => (
            <div>
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checbox" className="mx-2">
                {item.title}
              </label>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "2",
      label: "Cibil",
      children: (
        <div>
          {dropcontent.map((item) => (
            <div>
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checbox" className="mx-2">
                {item.title}
              </label>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "3",
      label: "Account Report",
      children: (
        <div>
          {dropcontent.map((item) => (
            <div>
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checbox" className="mx-2">
                {item.title}
              </label>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const items = [
    {
      key: "0",
      label: <button> Dummy Data </button>,
    },
    {
      key: "1",
      label: (
        <button>
          Name {"("}A to Z {")"}{" "}
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button>
          Name {"("}Z to A {")"}{" "}
        </button>
      ),
    },

    // {
    //   key: '5',
    //   label: <button className={admin ? 'dropdownButtonSort' : 'vanishButton'} > {'+'} Add Options </button>,

    // },
  ];

  return (
    <>
      <div className="fileDictionary_container">

        <div className="fileDictionary_container_left">
          <div className="fileDictionary_container_left_dataSec">
            <div>
              <p className="fileDictionary_container_left_dataSec_txt">
                Select A File To View The Headers
              </p>
            </div>

            <div className="searchNsortsec">
              <div className="searchDiv">
                <Input
                  disableUnderline={true}
                  className="search-inputforFile"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon
                        className="searchicon"
                        sx={{ color: "#36556B" }}
                      />
                    </InputAdornment>
                  }
                  placeholder="Enter Text Here"
                  type="text"
                ></Input>
              </div>

              <div
                style={{
                  marginLeft: "0vw",
                  marginTop: "0vh",
                  maxHeight: "5vh",
                  height: "4.5vh",
                }}
              >
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={["click"]}
                >
                  <div
                    className="sortBtn"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    style={{
                      width: "6.5vw",
                      maxHeight: "5vh",
                      height: "5vh",
                      border: "1px solid #36556B",
                    }}
                  >
                    <p style={{ color: "#36556B", fontSize: "0.9cqw" }}>
                      Sort By
                    </p>
                    <img
                      src={downArrow}
                      alt=""
                      style={{ paddingLeft: "-1vw" }}
                    />{" "}
                  </div>
                </Dropdown>
              </div>
            </div>

            <div>
              <Collapse
                className="bg-white border-none outline-none shadow-none font-semibold 2xl:text-xl"
                items={collapseEle}
              />
            </div>
          </div>

          <div className="fileDictionary_container_left_btn">
            <button className="border py-2 px-9 mx-2 rounded-full text-white bg-gradient-to-t from-[#E75126] to-[#F8A716]">
              <p style={{ color: "white" }}>Download</p>
            </button>
          </div>
        </div>

        <div className="fileDictionary_container_right">
          <div className="tableContainer">
            <div class="tableInnerContainer">
              <table className="tableFile">
                <thead className="tableHeadFile">
                  <td className="tableHeadFileTh">Agreement Number</td>
                </thead>
                <tbody className="tableBodyFile">
                  {datas.map((ele) => (
                    <tr key={ele.val}>
                      <td className="tableBodyFileTd">
                        <p>{ele.val}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default FileDictionary;
