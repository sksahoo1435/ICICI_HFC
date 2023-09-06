import { Box, Grid } from '@mui/material';
import { Dropdown } from 'antd';
import React, { useState } from 'react'
import downArrow from "../../../../../Assets/Union 2.png";
import Singlegrid from '../../../main/FolderView/SingleGrid/Singlegrid';
import SingleRow from '../../../main/ListView/singleRow/SingleRow';
import Center from './Center';

const DownloadDestination = ({ gridView, advance, setAdvance }) => {
  const [admin, setAdmin] = useState(true);

  console.log(setAdmin);

  const [selectDrop, setSelectDrop] = useState(0);
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


        <p>      Please Select A Folder For Input File </p>

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
                <Grid item xs={2} sm={2} md={2} >
                  <Singlegrid onClick={() => { setAdvance(true);sessionStorage.setItem('FileName', 'CIBIL') }} title={"CIBIL"} />

                </Grid>
                <Grid item xs={2} sm={2} md={2} >
                  <Singlegrid onClick={() => { setAdvance(true);sessionStorage.setItem('FileName', 'loans') }} title={"Loans"} />

                </Grid>
                <Grid item xs={2} sm={2} md={2} >
                  <Singlegrid onClick={() => { setAdvance(true); sessionStorage.setItem('FileName', 'saving') }} title={"Savings"} />

                </Grid>
                <Grid item xs={2} sm={2} md={2} >
                  <Singlegrid onClick={() => { setAdvance(true);sessionStorage.setItem('FileName', 'Credit') }} title={"Credit"} />

                </Grid>
                <Grid item xs={2} sm={2} md={2} >
                  <Singlegrid onClick={() => { setAdvance(true);sessionStorage.setItem('FileName', 'Accounts') }} title={"Accounts"} />

                </Grid>


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
                  <SingleRow heading={"CIBIL"} onClick={() => { setAdvance(true); }} dateModified={"27-04-2023"} type={"File Folder"} />
                  <SingleRow heading={"Loans"} onClick={() => { setAdvance(true); }} dateModified={"12-05-2023"} type={"File Folder"} />
                  <SingleRow heading={"Savings"} onClick={() => { setAdvance(true); }} dateModified={"23-04-2023"} type={"File Folder"} />
                  <SingleRow heading={"Credits"} onClick={() => { setAdvance(true); }} dateModified={"11-06-2023"} type={"File Folder"} />
                  <SingleRow heading={"Accounts"} onClick={() => { setAdvance(true); }} dateModified={"21-06-2023"} type={"File Folder"} />

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
