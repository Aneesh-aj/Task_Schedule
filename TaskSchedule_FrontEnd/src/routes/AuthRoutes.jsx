import { Route, Routes } from "react-router-dom"
import UserSignUp from "../page/UserSignup"
import UserLogin from "../page/UserLogin"
import Home from "../page/Home"
import Otp from "../page/Otp"


const AuthRoutes = () => {
     console.log(" it comes here")
    return (
        <>
            <Routes>
                <Route path="/userSignup" element={<UserSignUp />}></Route>
                <Route path='/userLogin' element={<UserLogin/>} />
                <Route path="/otp" element={<Otp/>} />
                <Route path="*" element={<UserLogin/>} ></Route>
            </Routes>
        </>
    )
}

export default AuthRoutes