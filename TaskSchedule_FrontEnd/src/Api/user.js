import Api from "../Survice/axios";
import { UserApi } from "../Survice/endPoints/userEndPoints";


export const userSignup = async(data)=>{
    try{
         const response = await Api.post(UserApi.signup,{data:data})
         return response.data
    }catch(error){
        return error
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


export const userLogin=async(user)=>{
    try{
        const response = await Api.post(UserApi.login,{email:user.email,password:user.password})
        return response.data
    }catch(error){
        return error
    }
}

export const userLogout=async()=>{
    try{
        const response = await Api.post(UserApi.userLogout,{})
        return response.data
    }catch(error){
        throw error
    }
}


export const getTasks=async(id)=>{
    try{
       const response = await Api.get(UserApi.getTasks+`/${id}`)
       return response.data
    }catch(error){
        throw error
    }
}

export const startTask=async(id,startTime)=>{
    try{
        const response = await Api.put(UserApi.startTask,{id,startTime})
        return response.data
    }catch(error){
        throw error
    }
}

export const endTask=async(id,endTime)=>{
    try{
        const response = await Api.put(UserApi.endTask,{id,endTime})
        return response.data
    }catch(error){
        throw error
    }
}

export const fetchTask= async(taskId)=>{
    try{
       const response = await Api.get(UserApi.fetchTask+`/${taskId}`)
       return response.data
    }catch(error){
        throw error
    }
}

export const resendOtp= async()=>{
    try{
        const response = await Api.post(UserApi.resendOtp)
        return response.data
    }catch(error){
        return error
    }
}