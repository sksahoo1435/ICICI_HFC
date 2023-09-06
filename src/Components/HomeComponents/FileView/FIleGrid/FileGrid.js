import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SingleFileGrid from './SingleFileGrid/SingleFileGrid';
import folder from "../../../../Assets/folderImg.svg";
import axios from 'axios';

const FileGrid = () => {
  const [pdata, setPdata] = useState([{}]);
  const folderName = sessionStorage.getItem("foldername");

  const fetchFilesInFolder = async () => {
    try {
      const getFilesInFolderApiUrl = `https://localhost:7062/api/ReportingModule/GetFilesInFolder/${folderName}`;
      const filesResponse = await axios.get(getFilesInFolderApiUrl, {
        withCredentials: true,
      });

      const files = filesResponse.data;
      let pro = filesResponse.data;
      sessionStorage.setItem("filename", pro);
      setPdata(pro);
      console.log(`Files in folder ${folderName}:`, files);
    } catch (error) {
      console.error("Error fetching files in folder:", error);
    }
  };

  useEffect(() => {
    fetchFilesInFolder();
  }, []);

  return (

    <div className='folderContent'>


      <div style={{ marginLeft: "3vw" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 16 }}
            style={{ paddingBottom: "3vh" }}
          >

            <Grid item xs={2} sm={2} md={2}>
              {pdata.map((item) => (

                <SingleFileGrid source={folder} title={`${item}`} />

              ))}
            </Grid>

          </Grid>
        </Box>
      </div>

    </div>
  )
}

export default FileGrid
