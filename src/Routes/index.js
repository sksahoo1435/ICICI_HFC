import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Settings from "../Pages/Settings";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<HomePage/>
    },
    {
        path:"/settings",
        element:<Settings/>
    },
])