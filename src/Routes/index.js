import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import HomePage from "../Pages/HomePage";
import Settings from "../Pages/Settings";

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