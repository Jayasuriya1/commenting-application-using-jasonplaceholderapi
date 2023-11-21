import React, { createContext, useContext, useState } from "react";


export const AppContext = createContext(null)

export default function AppProvider({children}){
    const [post,setPost] = useState(null)
    const [comments,setComments] = useState(null)
    const [user,setUser] = useState(null)
    const [userProfile,setUserProfile] = useState({
        id:11,
        name:"jayasuriya"
    })
    // const [cartProductId,setCartProductId] = useState([])
    // const [productCount,setProductCount] = useState(0)
    // const [totalCartPrice,setTotalCartPrice] = useState(0)
    
    return(
        <AppContext.Provider
        value={{
            post,
            setPost,
            comments,
            setComments,
            user,
            setUser,
            userProfile,
            setUserProfile
        }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const AppState = ()=>{
    return useContext(AppContext)
}