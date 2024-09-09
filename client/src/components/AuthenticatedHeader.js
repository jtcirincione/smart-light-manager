import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { Link } from "react-router-dom";
import Loader from "./Loader";


function AuthenticatedHeader({children}) {
    const [username, setusername] = useState("")
    const { isAuthenticated, isLoading } = useAuth()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            window.location = "/login";
        }
    }, [isLoading, isAuthenticated]);

    const handleLogout = async () => {
        const response = await fetch("/server/auth/logout", {
            method: "DELETE",
            credentials: "include",
        })
        if (response.status === 200) {
            window.location = "/login"
        }
    }


    return (
        <>
            {isLoading || !isAuthenticated ? <Loader /> : (
                <>
                    <div className="z-10 flex items-center justify-between py-4 mx-auto mb-4 bg-blue-500">
                        {/* Logo */}
                        <Link to="/" className="block">
                            <h1 className="ml-2 text-3xl font-extrabold">
                                John's <span className="text-white">Lights</span>
                            </h1>
                        </Link>

                        {/* Navigation Buttons */}
                        <div className="flex space-x-4">
                            <Link to="/" className="text-white hover:text-gray-300">
                                Admin Settings
                            </Link>
                            <button className="text-red-600 pr-5" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                    {children}
                </>)}

        </>
    )
}
export default AuthenticatedHeader;


