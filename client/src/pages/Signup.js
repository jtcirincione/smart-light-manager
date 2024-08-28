function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const submit = async () => {
        const response = await fetch("/server/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            
            },
            body: JSON.stringify({username, email, password}),
        });
        data = await response.json()
        
        if (response.status === 200) {
            window.location.href = "/";
        } 
        else {
            alert("Invalid username or password.");
        }
    };

    return (
        <div className="">
            <h1 className="flex justify-center text-3xl">John's Lights</h1>
            <div className="flex justify-center">
                <div className="ml-5 mt-16">
                    <span className="flex justify-center border-black border-opacity-40 border rounded-md py-3  w-auto text-2xl">Signup</span>
                    <img src="/lights.jpg" alt="lights" className="mt-10 p-3 w-[300px]"></img>
                    <div className="flex justify-end items-center mt-4">Username: <input placeholder="username" className="p-2 mt-4 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg"/></div>
                    <div className="flex justify-end items-center mt-4">Email: <input placeholder="email" className="p-2 mt-4 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg"/></div>
                    <div className="flex justify-end items-center mt-4">Password: <input placeholder="password" className="p-2 mt-4 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg"/></div>
                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="https://lights.john-projects.org/login">I already have an account</a>
                    <button className="mt-10 border py-1 px-5 rounded-md border-black bg-green-300 w-full" onClick={submit}>Submit</button>
                </div>
            </div>
            <div className="">
                
            </div>
        </div>
    );
}

export default Signup