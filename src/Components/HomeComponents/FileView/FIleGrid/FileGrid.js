import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SingleFileGrid from './SingleFileGrid/SingleFileGrid';
import folder from "../../../../Assets/folderImg.svg";
import Statecontext from '../../../Context/Statecontext';
import './FileGrid.css';


const FileGrid = () => {

  const {filesinFolder } = useContext(Statecontext);


  return (

    <div className='folderContentFiles'>

      <div style={{ marginLeft: "3vw" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 16 }}
            style={{ paddingBottom: "3vh" }}
          >

            {filesinFolder.map((item, ind) => {
              return (
                <div className='filesDegin'>
                  <Grid item xs={2} sm={2} md={2} key={ind}>

                    <SingleFileGrid source={folder} title={`${item}`} />

                  </Grid>
                </div>
              )
            })}

          </Grid>
        </Box>
      </div>

    </div>
  )
}

export default FileGrid
