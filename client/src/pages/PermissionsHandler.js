import AuthenticatedHeader from "../components/AuthenticatedHeader";
import { useEffect, useState } from "react";
import Unauthorized from "../components/Unauthorized";

function PermissionsHandler() {

    const [isAuthorized, setAuthorized] = useState(false)

    useEffect(() => {
        const checkAuthStatus = async () => {
            fetch('server/auth/status')
                .then(async (response) => {
                    if (response.status === 200) {
                        setAuthorized(true);
                    } else {
                        setAuthorized(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }
            checkAuthStatus();
    }, []);
    

    return (
        <AuthenticatedHeader>
            {!isAuthorized ? <Unauthorized/> : (<div className="flex justify-center"></div>)}
        </AuthenticatedHeader>
    )
}

export default PermissionsHandler;