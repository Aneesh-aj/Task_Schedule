import Api from "../Survice/axios";
import { UserApi } from "../Survice/endPoints/userEndPoints";


export const userSignup = async(data)=>{
    try{
         const response = await Api.post(UserApi.signup,{data:data})
         return response.data
    }catch(error){
        throw error
    }
}

export const verifyOtp = async(otp)=>{
    try{
        const response = await Api.post(UserApi.otpVerfity,{otp:otp})
        return response.data
    }catch(error){
        console.log("got error",error)
        return error
    }
}


export const userLogin=async()=>{
    
}