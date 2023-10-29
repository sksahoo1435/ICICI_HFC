
import './App.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import Statecontext from './Components/Context/Statecontext';
import { useEffect, useState } from 'react';
import { disableContextMenuAndShortcuts } from './DisableContextMenuAndShortcuts';

function App() {

  const [filesinFolder, setFilesInfolder] = useState([]);
  const [fileNameTosend, setFileNameTosend] = useState('')
  const [folderName, setFfolderName] = useState('')
  const [fileNameForUpload, setFileNameForUpload] = useState('')

  const [isUploadTrue, setIsUploadTrue] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [filesinsearch, setFilesinSearch] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

   //let apiBaseurl="http://localhost:8082/";  //uncomment before deployment
 let  apiBaseurl="https://localhost:44329/";   
//let  apiBaseurl="http://10.74.50.2:97/";


function preventZoom(e) {
  if ((e.ctrlKey || e.metaKey) && (e.wheelDelta > 0 || e.detail < 0)) {
    e.preventDefault();
  }
}


  useEffect(() => {
    //disableContextMenuAndShortcuts();
    window.addEventListener('wheel', preventZoom, { passive: false });
    const preventZoomShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-')) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('keydown', preventZoomShortcut);
    
    return () => {
      window.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventZoomShortcut);
    };
  }, []);

  
  return (
    <Statecontext.Provider value={{
      filesinFolder, folderName, setFfolderName, setFilesInfolder, fileNameTosend,
      setFileNameTosend, openModal, setOpenModal, filesinsearch, setFilesinSearch,showPopup, setShowPopup,
      fileNameForUpload, setFileNameForUpload, isUploadTrue, setIsUploadTrue,apiBaseurl
    }} >
      <RouterProvider router={router} />
    </Statecontext.Provider>
  );
}

export default App;
