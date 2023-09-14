import { Box, Grid } from '@mui/material';
import { Dropdown } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import downArrow from "../../../../../Assets/Union 2.png";
import Singlegrid from '../../../main/FolderView/SingleGrid/Singlegrid';
import SingleRow from '../../../main/ListView/singleRow/SingleRow';
import Center from './Center';
import Statecontext from '../../../../Context/Statecontext';
import axios from 'axios';

const DownloadDestination = ({ gridView, advance, setAdvance }) => {

  const { setFileNameForUpload } = useContext(Statecontext);

  const [folders, setFolders] = useState([]);
  const [selectDrop, setSelectDrop] = useState(0);

  const fetchFolderForUpload = async () => {
    const ApiTouse = `https://localhost:7062/api/ReportingModule/GetUploadFileNames`

    try {
      const response = await axios.get(ApiTouse, {
        withCredentials: true,
      })

      if (response.status === 200) {
        setFolders(response.data)
      } else {
        console.log("response is not 200", response)
      }

    } catch (error) {
      console.log("API error", error)
    }
  }

  useEffect(() => { fetchFolderForUpload(); }, [])

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

  return (<>
    {advance ? <Center /> : <div className='FolderMainDiv'>
      <div className='folderTitle'>
        <p> Please Select A Folder For Input File </p>

        <div>
          <Dropdown menu={{
            items,
          }}
            trigger={['click']}

          >
            <div className='sortBtn' onClick={(e) => { e.preventDefault() }} > Sort By  <img src={downArrow} alt="" /> </div>
          </Dropdown>
        </div>
      </div>

      <div className='folderContent'>

        {gridView ?
          <div style={{ marginLeft: "3vw" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 16 }}
                style={{ paddingBottom: "3vh" }}
              >

                {folders && folders.length > 0 && folders.map((ele, ind) =>
                  <Grid item xs={2} sm={2} md={2} key={ind}>
                    <Singlegrid onClick={() => { setAdvance(true); setFileNameForUpload(ele) }} datas={ele} />
                  </Grid>
                )}

              </Grid>
            </Box>
          </div>
          :
          <>
            <div className="listView">
              <table className='myTable'>
                <thead>
                  <tr className="HeadingRow">
                    <th>Name</th>
                    <th>Date Modified</th>
                    <th>Type</th>

                  </tr>

                </thead>
                <tbody>
                  {folders && folders.length > 0 && folders.map((ele, ind) =>
                    <SingleRow key={ind} heading={ele} onClick={() => { setAdvance(true);setFileNameForUpload(ele) }} dateModified={"27-04-2023"} type={"File Folder"} />
                  )}
                </tbody>
              </table>
            </div>
          </>}
      </div>

    </div>
    }
  </>
  )
}

export default DownloadDestination
