import Api from "../Survice/axios"
import { adminApi } from "../Survice/endPoints/adminEndPoints"


export const login = async(data)=>{
    try{
        const response = await Api.post(adminApi.login,{data})
        return response.data
    }catch(error){
        return error
    }
}


export const createTask= async(data)=>{
    try{
        const response = await Api.post(adminApi.createTask,{data})
        return response.data
    }catch(error){
        throw error
    }
}


export const getUsers=async()=>{
    try{
     const response = await Api.get(adminApi.getUsers)
     return response.data
    }catch(error){
        throw error
    }
}

export const getTasks=async()=>{
    try{
        const response = await Api.get(adminApi.getTasks)
        return response.data
    }catch(error){
        throw error
    }
}


export const updateTask=async(id,formData)=>{
    try{
        const response = await Api.put(adminApi.updateTask,{id,formData})
        return response.data
    }catch(error){
        throw error
    }
}