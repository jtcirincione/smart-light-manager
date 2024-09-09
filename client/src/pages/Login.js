import { useState } from "react";
import UnautheticatedHeader from "../components/UnauthenticatedHeader";
function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = async () => {
        const response = await fetch("/server/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ username, password }),
        }).catch(err => {
            alert("Unknown Error")
        });

        console.log("Status: " + response.status)

        if (response.status === 200) {
            console.log("repoop")
            alert("hooray! you're logged in.");
            window.location.href = "/";
        }
        else {
            let data = await response.json()
            console.log(response.status)
            alert(data.message);
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }


    return (
        <UnautheticatedHeader>
            <div className="">
                <div className="flex justify-center">
                    <div className="ml-5 mt-16">
                        <span className="flex justify-center border-black border-opacity-40 border rounded-md py-3  w-auto text-2xl">Login!</span>
                        <img src="/lights.jpg" alt="lights" className="mt-10 p-3 w-[300px]"></img>
                        <div className="flex justify-end items-center mt-4">Userneame: <input placeholder="username" value={username} onChange={handleUsernameChange} className="p-2 mt-4 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg" /></div>
                        <div className="flex justify-end items-center mt-4">Password: <input placeholder="password" value={password} onChange={handlePasswordChange} className="p-2 mt-4 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg" /></div>
                        <button className="mt-10 mb-8 border py-1 px-5 rounded-md border-black bg-green-300 w-full" onClick={submit}>Submit</button>
                    </div>
                </div>
                <div className="">

                </div>
            </div>
        </UnautheticatedHeader>
    );
}

export default Login;