import { createBrowserRouter } from "react-router-dom"
import Dahsboard from "../pages/Dashboard"
import Main from "../Layout/Main"


export const router = createBrowserRouter([

    {

        path : '/',
        element : <Main />,
        children : [
            {
                path : 'dashboard',
                element : <Dahsboard />
            }
        ]
       
    }
])