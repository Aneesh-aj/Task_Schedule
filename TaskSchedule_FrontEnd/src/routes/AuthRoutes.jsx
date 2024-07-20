import { Route, Routes } from "react-router-dom"

import UserSignUp from "../page/user/UserSignup"
import UserLogin from "../page/user/UserLogin"
import Otp from "../page/user/Otp"
import AdminLogin from "../page/admin/AdminLogin"
import ErrorPage from "../componant/ErrorPage"



const AuthRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/userSignup" element={<UserSignUp />}></Route>
                <Route path='/userLogin' element={<UserLogin/>} />
                <Route path="/adminLogin" element={<AdminLogin/>} />
                <Route path="/otp" element={<Otp/>} />
                <Route path="*" element={<ErrorPage/>} ></Route>

            </Routes>
        </>
    )
}

export default AuthRoutes