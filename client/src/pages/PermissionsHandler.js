import AuthenticatedHeader from "../components/AuthenticatedHeader";
import { useEffect, useState } from "react";
import Unauthorized from "../components/Unauthorized";
import UserCard from "../cards/UserCard";
import Loader from "../components/Loader";

function PermissionsHandler() {

    const [isAuthorized, setAuthorized] = useState(false);
    const [userSearch, setUserSearch] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            setIsLoadingAuth(true);
            try {
                const response = await fetch('server/auth/status');
                if (response.status === 200) {
                    const data = await response.json();
                    setAuthorized(data.permissions.includes("MANAGER"));
                } else {
                    setAuthorized(false);
                }
            } catch (err) {
                console.log(err);
                setAuthorized(false);
            } finally {
                setIsLoadingAuth(false); // Ensure this runs after completion
            }
        };
        checkAuthStatus();
    }, []);

    useEffect(() => {
        const searchForUser = async () => {
            setIsLoadingUsers(true)
            if (userSearch == "") {
                setFoundUsers([])
                setIsLoadingUsers(false)
                return;
            }
            const response = await fetch(`/server/users/${userSearch}`)
            const data = await response.json()
            setFoundUsers(data.usernames)
            setIsLoadingUsers(false)
        }
        searchForUser()
    }, [userSearch]);


    const handleUserSearch = (event) => {
        setUserSearch(event.target.value)
    };

    if (isLoadingAuth) {
        return <Loader />
    }

    return (
        <AuthenticatedHeader>
            {!isAuthorized && !isLoadingAuth ? <Unauthorized /> : isLoadingAuth ? <Loader /> : (
                <div className="flex justify-center">
                    <div>
                        <div className="pb-4">
                            <span className="text-2xl">Search for user:</span><input type="text" placeholder="username" value={userSearch} onChange={handleUserSearch} />
                        </div>
                        <div className="text-xl">Results: </div>
                        {isLoadingUsers ? <Loader /> : <>{foundUsers.map((username) => (
                            <UserCard key={username} username={username} />
                        ))}</>}
                    </div>
                </div>
            )}
        </AuthenticatedHeader>
    )
}

export default PermissionsHandler;