import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { useState,createContext, useEffect } from "react";

const UserType=createContext()
const UserContext=({children})=>{

    const [userId, setUserId] = useState("")
    
    
    const fetchUserId=async()=>{
        const token = await AsyncStorage.getItem("token");
        const decodedtoken = jwtDecode(token);
        const userId = decodedtoken.user.id;
    }  
    
    return(
        <UserType.Provider value={{userId,setUserId,fetchUserId}}>
            {children}
        </UserType.Provider>
    )
}
export  {UserType,UserContext};