import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Settings from "../Pages/Settings";
import Login from '../Pages/Login';

export const router = createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"/home",
        element:<HomePage/>
    },
    {
        path:"/settings",
        element:<Settings/>
    },
])