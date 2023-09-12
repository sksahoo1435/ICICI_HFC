
import './App.css';
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import Statecontext from './Components/Context/Statecontext';
import { useState } from 'react';
function App() {

  const [filesinFolder, setFilesInfolder] = useState([]);

  return (
    <Statecontext.Provider value={{ filesinFolder, setFilesInfolder }} >
      <RouterProvider router={router} />
    </Statecontext.Provider>
  );
}

export default App;
