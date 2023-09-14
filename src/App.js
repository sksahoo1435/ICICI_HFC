
import './App.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import Statecontext from './Components/Context/Statecontext';
// import { useEffect, useState } from 'react';
// import { disableContextMenuAndShortcuts } from './DisableContextMenuAndShortcuts';
import { useState } from 'react';
function App() {

  const [filesinFolder, setFilesInfolder] = useState([]);
  const [fileNameTosend,setFileNameTosend] = useState('')

  const [fileNameForUpload,setFileNameForUpload] = useState('')

  // useEffect(() => {
  //   disableContextMenuAndShortcuts();
  // }, []);


  return (
    <Statecontext.Provider value={{ filesinFolder, setFilesInfolder,fileNameTosend,setFileNameTosend,fileNameForUpload,setFileNameForUpload }} >
      <RouterProvider router={router} />
    </Statecontext.Provider>
  );
}

export default App;
