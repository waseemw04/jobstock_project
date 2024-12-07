import { createContext, useEffect, useState } from "react";
import { getUser } from "../helper";
import axios from "axios";


export const AuthContext = createContext();

export const  AuthContextProvider = (props) => {

    const [user, setUser] = useState(null);
    const [euser, setEuser] = useState(null)
    
   
 
    useEffect(() => {
        const currentUser = getUser();
        setUser(currentUser)
        
        }, []);
       
        const id = user?.id
       
        
        useEffect(() => {
            axios
                .get('http://localhost:3003/user/' + id)
                .then((response) => {
                    // Handle successful response
                    setEuser(response.data.user)
                })
                .catch((error) => {
    
                    console.error(error);
    
                })
        }, [id])
     


    return (
        <AuthContext.Provider value={{user, setUser, euser, setEuser}}>{props.children}</AuthContext.Provider>
    )    

}