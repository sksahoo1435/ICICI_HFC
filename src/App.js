
import './App.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import Statecontext from './Components/Context/Statecontext';
// import { useEffect, useState } from 'react';
// import { disableContextMenuAndShortcuts } from './DisableContextMenuAndShortcuts';
import { useState } from 'react';
function App() {

  const [filesinFolder, setFilesInfolder] = useState([]);
  const [fileNameTosend, setFileNameTosend] = useState('')
  const [folderName, setFfolderName] = useState('')
  const [fileNameForUpload, setFileNameForUpload] = useState('')

  const [isUploadTrue, setIsUploadTrue] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [filesinsearch, setFilesinSearch] = useState([]);

  // useEffect(() => {
  //   disableContextMenuAndShortcuts();
  // }, []);


  return (
    <Statecontext.Provider value={{
      filesinFolder, folderName, setFfolderName, setFilesInfolder, fileNameTosend,
      setFileNameTosend, openModal, setOpenModal, filesinsearch, setFilesinSearch,
      fileNameForUpload, setFileNameForUpload, isUploadTrue, setIsUploadTrue
    }} >
      <RouterProvider router={router} />
    </Statecontext.Provider>
  );
}

export default App;
