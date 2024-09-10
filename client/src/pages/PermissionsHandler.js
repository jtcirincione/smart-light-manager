import AuthenticatedHeader from "../components/AuthenticatedHeader";
import { useEffect, useState } from "react";
import Unauthorized from "../components/Unauthorized";

function PermissionsHandler() {

    const [isAuthorized, setAuthorized] = useState(false);
    const [userSearch, setUserSearch] = useState("");
    const [foundUsers, setFoundUsers] = useState([])

    useEffect(() => {
        const checkAuthStatus = async () => {
            fetch('server/auth/status')
                .then(async (response) => {
                    if (response.status === 200) {
                        const data = await response.json();
                        if (data.permissions.includes("MANAGER")) {
                            setAuthorized(true);
                        }
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

    const searchForUser = async () => {
        const response = await fetch(`/server/users/${userSearch}`)
        const data = await response.json()
        setFoundUsers(data.usernames)

    }
    const handleUserSearch = (event) => {
        setUserSearch(event.target.value)
        searchForUser()
    };


    return (
        <AuthenticatedHeader>
            {!isAuthorized ? <Unauthorized /> : (
                <div className="flex justify-center">
                    <div>
                        <div>
                            <span>Search for user:</span><input type="text" placeholder="username" value={userSearch} onChange={handleUserSearch} />
                        </div>
                        <div>results: </div>
                        {foundUsers.map((username) => (
                            <div key={username}>
                                {username}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </AuthenticatedHeader>
    )
}

export default PermissionsHandler;