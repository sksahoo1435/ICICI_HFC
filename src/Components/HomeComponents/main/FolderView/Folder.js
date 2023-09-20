import React, { useState, useEffect, useContext } from "react";
import "./Folder.css";
import { Dropdown } from "antd";
import downArrow from "../../../../Assets/Union 2.svg";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Singlegrid from "./SingleGrid/Singlegrid";
import List from "../ListView/List";
import axios from "axios";
import Statecontext from "../../../Context/Statecontext";

const Folder = ({ gridView, fileView, setFileView }) => {
  const { setFilesInfolder } = useContext(Statecontext);

  const [selectDrop, setSelectDrop] = useState('');

  const [updatedpdata, setUpdatedPdata] = useState([{}]);

  const fetchFilesInFolder = async (folderName) => {
    try {
      const getFilesInFolderApiUrl = `https://localhost:7062/api/ReportingModule/GetFilesInFolder/${folderName}`;
      const filesResponse = await axios.get(getFilesInFolderApiUrl, {
        withCredentials: true,
      });

      const files = filesResponse.data;
      setFilesInfolder(files)
      console.log("needded files", files);

    } catch (error) {
      console.error("Error fetching files in folder:", error);
    }
  };

  useEffect(() => {
    const files = "https://localhost:7062/api/ReportingModule/GetFoldersWithPermissions";

    async function fetchData() {
      try {
        const result1 = await axios.get(files, {
          withCredentials: true,
        });

        let pro = result1.data;
        setUpdatedPdata(pro);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ApiToFetch = `https://localhost:7062/api/ReportingModuleFilter/GetFoldersWithPermissions?sortOrder=${selectDrop}`;

        const response = await axios.get(ApiToFetch, {
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log("updated data ---->", response.data)
          setUpdatedPdata(response.data);
        } else {
          console.log('API response error', response.status);
        }
      } catch (err) {
        console.log('Error in API', err);
      }
    };

    fetchData();
  }, [selectDrop]);


  const items = [
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
            setSelectDrop('A-Z');
          }}
        >
          A to Z
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
            setSelectDrop('Z-A');
          }}
        >
          Z to A
        </button>
      ),
    },

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
                  {updatedpdata.map((item, ind) => {
                    return (
                      //column
                      <Grid item xs={2} sm={2} md={2} key={ind}>
                        <Singlegrid
                          datas={item.folderName}
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
            <List fileView={fileView} setFileView={setFileView} updateData ={updatedpdata} />
          )}
        </div>
      </div>
    </>
  );
};

export default Folder;
