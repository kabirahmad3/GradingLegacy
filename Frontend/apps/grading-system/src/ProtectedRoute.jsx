import { useContext } from "react";
import { Outlet , Navigate } from "react-router";
import { UserContext } from "./ContextApi";



const ProtectedRoute=()=>{
    const {user}=useContext(UserContext)
    console.log(user);
    if (user?._id){
        return <Outlet />
    }else{
        return <Navigate to={"/login"}/>
    }
}

export default ProtectedRoute;