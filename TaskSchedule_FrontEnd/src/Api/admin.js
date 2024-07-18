import Api from "../Survice/axios"
import { adminApi } from "../Survice/endPoints/adminEndPoints"


export const login = async()=>{
    try{
        const response = await Api.post(adminApi.signup,{data})
        return response.data
    }catch(error){
        throw error
    }
}