import React, { useState, useEffect } from "react";
import "./Folder.css";
import { Dropdown } from "antd";
import downArrow from "../../../../Assets/Union 2.svg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Singlegrid from "./SingleGrid/Singlegrid";
import List from "../ListView/List";
import axios from "axios";

const Folder = ({ gridView, fileView, setFileView }) => {
  const [admin, setAdmin] = useState(true);
  const [selectDrop, setSelectDrop] = useState(0);
  const [windowsUsername, setWindowsUsername] = useState("");

  const [pdata, setPdata] = useState([{}]);

  const fetchFilesInFolder = async (folderName) => {
    try {
      const getFilesInFolderApiUrl = `https://localhost:7062/api/ReportingModule/GetFilesInFolder/${folderName}`;
      const filesResponse = await axios.get(getFilesInFolderApiUrl, {
        withCredentials: true,
      });

      const files = filesResponse.data;
      console.log(`Files in ${folderName}:`, files);

      console.log("needded files", files);

      // Handle the files data as needed...
    } catch (error) {
      console.error("Error fetching files in folder:", error);
    }
  };

  useEffect(() => {
    const usernameApiUrl =
      "https://localhost:7062/api/ReportingModule/GetUsername";

    async function fetchData() {
      try {
        const response = await axios.get(usernameApiUrl, {
          withCredentials: true,
        });

        const username = response.data.username;
        setWindowsUsername(username);
        sessionStorage.setItem("username", response.data.username);
        console.log("Windows Login Username:", username);

        // Fetch other data here...
      } catch (error) {
        // Handle error if necessary
        console.error("Error fetching username:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const files =
      "https://localhost:7062/api/ReportingModule/GetFoldersWithPermissions";

    async function fetchData() {
      try {
        const result1 = await axios.get(files, {
          withCredentials: true,
        });

        let pro = result1.data;
        setPdata(pro);
        console.log("pdata:", pdata);
      } catch (error) {
        // Handle error if necessary
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  console.log("Windows Login Username:", windowsUsername);

  const items = [
    {
      key: "0",
      label: (
        <button
          className={
            selectDrop > 0 ? "cancelButton dropdownButtonSort" : "vanishButton"
          }
          onClick={() => {
            setSelectDrop(0);
          }}
        >
          {" "}
          {"x"} Clear Options{" "}
        </button>
      ),
    },
    {
      key: "1",
      label: (
        <button
          className={
            selectDrop === 1
              ? "selectedButton dropdownButtonSort"
              : "dropdownButtonSort"
          }
          onClick={() => {
            setSelectDrop(1);
          }}
        >
          Name {"("}A to Z {")"}{" "}
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          className={
            selectDrop === 2
              ? "selectedButton dropdownButtonSort"
              : "dropdownButtonSort"
          }
          onClick={() => {
            setSelectDrop(2);
          }}
        >
          Name {"("}Z to A {")"}{" "}
        </button>
      ),
    },
    
    // {
    //   key: "5",
    //   label: (
    //     <button className={admin ? "dropdownButtonSort" : "vanishButton"}>
    //       {" "}
    //       {"+"} Add Options{" "}
    //     </button>
    //   ),
    // },
  ];
  
  return (
    <>
      <div className="FolderMainDiv">
        <div className="folderTitle">
          <p className="folderTitleP">Please Select A Folder To View The Files </p>

          <div style={{ marginLeft: "0vw", marginTop: "0vh", maxHeight: "5vh", height: "4.5vh" }}>
            <Dropdown menu={{
              items,
            }}
              trigger={['click']}

            >
              <div className='sortBtn' onClick={(e) => { e.preventDefault() }}
                style={{ width: "6.5vw", maxHeight: "5vh", height: "5vh", border: "1px solid #36556B", }}>
                <p style={{ color: "#36556B" }}>Sort By</p>
                <img src={downArrow} alt="" style={{ paddingLeft: "-1vw" }} /> </div>
            </Dropdown>
          </div>

        </div>
        <div className="folderContent">
          {gridView ? (
            <div style={{ marginLeft: "3vw" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 16 }}
                  style={{ paddingBottom: "3vh" }}
                >
                  {pdata.map((item) => {
                    console.log("item", item);
                    // console.log("item.title",item.title);

                    sessionStorage.setItem("foldername", item.folderName);
                    return (
                      //column
                      <Grid item xs={2} sm={2} md={2}>
                        <Singlegrid
                          title={item.folderName}
                          onClick={() => {
                            fetchFilesInFolder(item.folderName);

                            setFileView(true);
                          }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </div>
          ) : (
            <List fileView={fileView} setFileView={setFileView} />
          )}
        </div>
      </div>
    </>
  );
};

export default Folder;
