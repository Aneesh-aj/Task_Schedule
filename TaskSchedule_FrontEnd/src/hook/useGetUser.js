import { useSelector } from "react-redux";

const useGetUser=()=>{
    const user = useSelector((state)=>state.user)
    console.log(" the user is ",user)

    return user
}

export default useGetUser