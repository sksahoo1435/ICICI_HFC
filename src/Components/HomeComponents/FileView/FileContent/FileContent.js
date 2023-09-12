import React, { useState } from 'react'
import "./FileContent.css"
import { Dropdown } from "antd";
import downArrow from "../../../../Assets/Union 2.svg";
import FilterImg from '../../../../Assets/filter.svg'
import FileGrid from '../FIleGrid/FileGrid';
import FileList from '../FileList/FileList';


const FileContent = ({ admin, gridView }) => {
  const [selectDrop, setSelectDrop] = useState(0);
  const [selectFilter, setSelectFilter] = useState(0);

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
    
  ];

  return (
    <>
      <div className='fileContent'>

        <div className='topBarFile'>

          <div className='starting'>
            <p>Home</p>  {" > "} <p>Files</p>
          </div>

          <div className='ending' >
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

            <div style={{ marginLeft: "-2vw", marginTop: "0vh", height: "4vh", }} >
              <Dropdown menu={{
                items: filterItems
              }}
                trigger={['click']}

              >
                <div className='sortBtn' onClick={(e) => { e.preventDefault() }}
                  style={{ maxHeight: "5vh", height: "5vh", border: "1px solid #36556B", width: "8vw" }} >
                  <img src={FilterImg} alt="" style={{ paddingLeft: "0vw" }} />
                  <p style={{ color: "#36556B" }}>Filters</p>
                  <img src={downArrow} alt="" style={{ paddingLeft: "-2vw" }} />
                </div>
              </Dropdown>
            </div>
          </div>

        </div>
        {gridView ? <FileGrid /> : <FileList />}
      </div>
    </>
  )
}

export default FileContent
