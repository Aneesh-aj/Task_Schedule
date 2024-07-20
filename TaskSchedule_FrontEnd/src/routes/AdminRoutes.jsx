import { Route, Routes } from "react-router-dom"
import AdminTask from "../page/admin/AdminTask"
import ErrorPage from "../componant/ErrorPage"

const AdminRoutes=()=>{
    return(
        <>
          <Routes>
             <Route path="/task" element={<AdminTask/>}/>
             <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </>
    )
}

export default AdminRoutes