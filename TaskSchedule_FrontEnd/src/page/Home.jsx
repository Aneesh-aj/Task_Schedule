import { Toolbar, Typography } from "@mui/material"
import backgroundImage2 from "../assets/black-white-portrait-digital-nomads_23-2151254008.avif"
import backgroundImage1 from "../assets/istockphoto-1316372316-612x612.jpg"
import backgroundImage3 from "../assets/side-view-people-working-together.jpg"

import "../App.css"
import Nav from "../componant/Nav"
import { useDispatch } from "react-redux"
import { clearUser } from "../utils/clearUser"




const Home = () => {
    
    // const dispatch = useDispatch()
    // clearUser(dispatch)
   
    return (
        <> 
         <Nav/>
            <div className="w-full  h-auto p-[5rem]  background_color">
                <Toolbar className=" h-[50%] ">
                    <Typography sx={{ flexDirection: 'column' }} className="w-[50%] h-full flex p-4  justify-center gap-3 animate-slideUp">
                        <button className="w-[7rem] h-[2rem] bg-sky-500 rounded-md text-white shadow-md hover:bg-sky-400 hover:shadow-lg transition-all duration-150 delay-150 ">
                            Assingment
                        </button>
                        <p className="font-sans">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit voluptas id labore, sit a sunt ea mollitia iusto ducimus aliquam officia ad blanditiis inventore, maxime quas eos officiis corporis dolores?</p>
                    </Typography>
                    <Typography className="w-[50%] flex justify-center items-center p-4  h-full rounded-lg ">
                        <div className="flex w-full gap-x-4 p-4 rounded-lg ">
                            <div className="flex h-80 justify-center w-full gap-1 relative">
                                <div className="w-[95%] animate-slideLeft flex gap-1">
                                    <img
                                        className="h-[85%] xl:h-[95%] w-[60%] xl:w-[50%] md:w-[40%]    rounded-md shadow-lg border border-sky-100 transform transition-transform duration-300 hover:scale-105 bg-white"
                                        src={backgroundImage2}
                                        alt=""
                                    />
                                    <div className="w-full gap-y-1 flex flex-col animate-slideRight">
                                        <div className="h-[48%] w-[100%] xl:w-[55%]  sm:w-[50%] md:[60%] mt-3 animate-slideRight">
                                            <img className=" w-full h-full rounded-md shadow-lg border transform transition-transform duration-300 hover:scale-105 bg-white"
                                                src={backgroundImage3}
                                                alt=""
                                            />
                                        </div>
                                        <div className="animate-slideUp h-[30%] xl:h-[40%]  w-[80%] xl:w-[35%] md:w-[40%]">
                                            <img
                                                className="w-full h-full rounded-md shadow-lg border transform transition-transform duration-300 hover:scale-105 bg-white"
                                                src={backgroundImage1}
                                                height={100}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Typography>
                </Toolbar>
                <Toolbar className="mt-5  p-8">
                    <Typography className="w-[50%] flex justify-center items-center">
                        <img src={backgroundImage1} className="h-[70%] xl:h-[80%] w-[80%] xl:w-[60%] md:w-[40%] animate-slideLeft   rounded-md shadow-lg border border-sky-100 transform transition-transform duration-300 hover:scale-105 bg-white" alt="" />
                    </Typography>
                    <Typography className="w-[50%]">
                        <p className="animate-slideRight font-medium">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit voluptas id labore, sit a sunt ea mollitia iusto ducimus aliquam officia ad blanditiis inventore, maxime quas eos officiis corporis dolores?</p>
                    </Typography>
                </Toolbar>
            </div>
        </>
    )
}


export default Home