import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const useAdmin = () => {
    const {user}=useContext(AuthContext)
    const axiosPublic=useAxiosPublic()


    
const {data:isAdmin,isPending:isAdminLoading}=useQuery({
    queryKey:['isAdmin',user?.email],
    queryFn:async()=>{
        const res=await axiosPublic.get(`/admin/${user?.email}`)
        return res.data?.admin
    }
})

    return [isAdmin,isAdminLoading]
};

export default useAdmin;