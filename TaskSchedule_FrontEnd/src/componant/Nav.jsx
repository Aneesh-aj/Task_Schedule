import { AppBar, Typography } from "@mui/material";
import logo from "../assets/TaskAssiner.png";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";


const Nav = () => {
   
   const navigate = useNavigate()

  return (
    <AppBar  sx={{ bgcolor: 'white', display: 'flex',flexDirection:"row" }} className="h-[4rem] w-full p-4  rounded-lg items-center justify-between">
      <Typography className="flex items-center h-full w-[7rem]">
        <img 
          src={logo} 
          alt="Task Assigner Logo" 
          className="h-[7rem] w-auto object-contain" 
        />
      </Typography>
      <Typography className=" flex gap-2">
      <button onClick={()=>navigate("/auth/userLogin")} className="w-[5rem] h-[2rem] bg-sky-500 rounded-md shadow-md hover:bg-sky-400 hover:shadow-lg transition-all duration-150 delay-150 ">
         Login
      </button>
      <button onClick={()=>navigate("/auth/userSignup")} className="w-[5rem] h-[2rem] bg-sky-500 rounded-md shadow-md hover:bg-sky-400 hover:shadow-lg transition-all duration-150 delay-150 ">
         SignUp
      </button>
      </Typography>
    </AppBar>
  );
};

export default Nav;
