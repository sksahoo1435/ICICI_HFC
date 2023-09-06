import React, { useState } from 'react'
import Navbar from '../Layouts/Navbar/Navbar'
import HomeComp from '../Components/HomeComponents/Home/Home'
import FileView from '../Components/HomeComponents/FileView/FileView';
// import HomeComp from "../Components/HomeComponents/Home"

const HomePage = () => {

const [fileView,setFileView] = useState(false);
const [admin, setAdmin] = useState(true);
const [activeTab, setActiveTab] = useState(0);
const [gridView, setGridView] = useState(true);
const [selectDrop, setSelectDrop] = useState(0);
const [selectFilter, setSelectFilter] = useState(0);
  return (
    <div>
    <Navbar />
    {fileView?
    <FileView fileView = {fileView} setFileView={setFileView} activeTab={activeTab} setActiveTab={setActiveTab} />
    :
      <HomeComp fileView = {fileView} setFileView={setFileView} admin={admin} setAdmin={setAdmin} activeTab={activeTab} setActiveTab={setActiveTab}
      gridView={gridView} setGridView={setGridView} selectDrop={selectDrop} setSelectDrop={setSelectDrop} selectFilter={selectFilter} setSelectFilter={setSelectFilter} />
}
    </div>
  )
}

export default HomePage
