import { AppBar, Typography } from "@mui/material";
import logo from "../assets/TaskAssiner.png";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import useGetUser from "../hook/useGetUser";
import { setUser } from "../redux/userSlice";
import { userLogout } from "../Api/user";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Nav = () => {
  const navigate = useNavigate();
  const user = useGetUser();
  const dispatch = useDispatch();

  async function userlogout() {
    try {
      const response = await userLogout();
      if (response.success) {
        toast.success(response.message);
        dispatch(setUser({ role: "", name: "", email: "", id: "" }));
        navigate("/auth/userLogin"); 
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-[4rem] w-full p-4 flex shadow-lg rounded-xl items-center bg-white justify-between">
      <Typography className="flex items-center h-full w-[7rem] rounded-2xl">
        <img
          src={logo}
          alt="Task Assigner Logo"
          className="h-[7rem] w-auto object-contain"
        />
      </Typography>
      <Typography className="flex gap-2">
        {!user.email ? (
          <>
            <button
              onClick={() => navigate("/auth/userLogin")}
              className="w-[5rem] text-white h-[2rem] bg-violet-500 rounded-md shadow-md hover:bg-violet-700 hover:shadow-lg transition-all duration-150 delay-150"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/auth/userSignup")}
              className="w-[5rem] text-white h-[2rem] bg-violet-500 rounded-md shadow-md hover:bg-violet-700 hover:shadow-lg transition-all duration-150 delay-150"
            >
              SignUp
            </button>
          </>
        ) : user.role === "user" ? (
          <>
            <ul className="flex gap-7 h-[2rem] items-center">
              <li className=" xl:border-t-0 xl:border-b-0 w-full flex justify-center">
                <a href="/" className="hover:text-gray-500 block py-2 md:py-0">
                  Home
                </a>
              </li>
              <li className="xl:border-b-0 w-full flex justify-center">
                <a href="/user/task" className="hover:text-gray-500 block py-2 md:py-0">
                  Task
                </a>
              </li>
              <li>
                <button
                  onClick={userlogout}
                  className="w-[5rem] text-white h-[2rem] bg-violet-500 rounded-md shadow-md hover:bg-violet-700 hover:shadow-lg hover:scale-95 transition-all duration-150 delay-150"
                >
                  Logout
                </button>
              </li>
            </ul>
          </>
        ) : user.role === "admin" ? (
          <>
            <ul className="flex gap-7 h-[2rem] items-center">
             
              <li className="xl:border-b-0 w-full flex justify-center">
                <a href="/" className="hover:text-gray-500 block py-2 md:py-0">
                   Home 
                </a>
              </li>
              <li className="xl:border-b-0 w-full flex justify-center">
                <a href="/admin/task" className="hover:text-gray-500 block py-2 md:py-0">
                  Task
                </a>
              </li>
              <li>
                <button
                  onClick={userlogout}
                  className="w-[5rem] text-white h-[2rem] bg-violet-500 rounded-md shadow-md hover:bg-violet-700 hover:shadow-lg hover:scale-95 transition-all duration-150 delay-150"
                >
                  Logout
                </button>
              </li>
            </ul>
          </>
        ) : null}
      </Typography>
    </div>
  );
};

export default Nav;
