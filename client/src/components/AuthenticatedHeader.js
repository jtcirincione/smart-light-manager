import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";


function AuthenticatedHeader() {
    const [username, setusername] = useState("")
    const {isAuthenticated, isLoading} = useAuth()

    if (!isAuthenticated && !isLoading) {
        window.location = "/";
    }


    
}


