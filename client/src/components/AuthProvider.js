import React, { createContext, useState, useEffect, useContext } from 'react';


export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [permissions, setPermissions] = useState([]);
    
    useEffect(() => {
        const checkAuthStatus = () => {
            setIsLoading(true);
            fetch('server/auth/status')
                .then(async (response) => {
                    if (response.status === 200) {
                        setIsAuthenticated(true);
                        const data = await response.json()
                        setPermissions(data.permissions)
                    } else {
                        setIsAuthenticated(false);
                    }
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
            }
            checkAuthStatus();
        // setTimeout(checkAuthStatus, 20000)
        ;
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, isLoading, permissions}}>
            {children}
        </AuthContext.Provider>
    )
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;