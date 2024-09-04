import { useEffect } from "react";

function Home() {
    useEffect(() => {
        const checkAuthStatus = async () => {
            fetch('server/auth/status')
                .then(async (response) => {
                    if (response.status != 200) {
                        window.location.href = "/login"
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        checkAuthStatus();
    }, []);


    const turnOff = async () => {
        const response = await fetch("/server/lights/off")
        if (response.status !== 200) {
            alert("Nice try but you really think I'd let anyone mess with my lights?")
        }
    };
    
    const turnOn = async () => {
        const response = await fetch("/server/lights/on")
        if (response.status !== 200) {
            alert("Nice try but you really think I'd let anyone mess with my lights?")
        }
    };

    const handleLogout = async () => {
        const response = await fetch("/server/auth/logout")
    }

    return (
        <div>
            <h1 className="flex justify-center text-3xl">John's Lights</h1>
            <a href="https://lights.john-projects.org/login" onClick={handleLogout}>logout</a>
            <div className="flex justify-center">
                <button className="mt-10 mx-4 mb-8 border py-1 px-24 rounded-md border-black bg-green-300" onClick={turnOn}>
                    on
                </button>
                <button className="mt-10 mx-4 mb-8 border py-1 px-24 rounded-md border-black bg-green-300" onClick={turnOff}>
                    off
                </button>
            </div>
        </div>
    );
}

export default Home;