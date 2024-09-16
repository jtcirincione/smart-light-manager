import { useState } from 'react';
import UnautheticatedHeader from '../components/UnauthenticatedHeader';

function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const submit = async () => {
        const response = await fetch("/server/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ username, email, password }),
        }).catch(err => {
            alert("Unknown Error")
        });


        if (response.status === 201) {
            alert("Account created successfully!")
            window.location.href = "/login";
        }
        else {
            let data = await response.json()
            console.log(response.status)
            alert("Invalid username or password: " + data.message);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key == "Enter") {
            submit()
        }
    }

    return (
        
        <UnautheticatedHeader>
            <div className="">
                <h1 className="flex justify-center text-3xl">John's Lights</h1>
                <div className="flex justify-center">
                    <div className="ml-5 mt-16">
                        <span className="flex justify-center border-black border-opacity-40 border rounded-md py-3  w-auto text-2xl">Signup</span>
                        <img src="/lights.jpg" alt="lights" className="mt-10 p-3 w-[300px]"></img>
                        <div className="flex justify-end items-center mt-4">Username: <input placeholder="username" value={username} onChange={handleUsernameChange} onKeyUp={handleKeyPress} className="p-2 mt-4 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg" /></div>
                        <div className="flex justify-end items-center mt-4">Email: <input placeholder="email" value={email} onChange={handleEmailChange} onKeyUp={handleKeyPress} className="p-2 mt-4 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg" /></div>
                        <div className="flex justify-end items-center mt-4">Password: <input placeholder="password" value={password} onChange={handlePasswordChange} onKeyUp={handleKeyPress} className="p-2 mt-4 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg" /></div>
                        <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://lights.john-projects.org/login">I already have an account</a>
                        <button className="mt-10 border py-1 px-5 rounded-md border-black bg-green-300 w-full mb-8" onClick={submit}>Submit</button>
                    </div>
                </div>
                <div className="">

                </div>
            </div>
        </UnautheticatedHeader>
        
    );
}

export default Signup;