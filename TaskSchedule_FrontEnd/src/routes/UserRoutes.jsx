import { Route, Routes } from "react-router-dom"
import Task from "../page/user/Task"
import Nav from "../componant/Nav"
import ErrorPage from "../componant/ErrorPage"


const UserRoutes=()=>{
    return(
        <>
          <Routes>
             <Route path="/task" element={<Task/>}></Route>
             <Route path="*" element={<ErrorPage/>}></Route>
          </Routes>
        
        </>
    )
}


export default UserRoutes