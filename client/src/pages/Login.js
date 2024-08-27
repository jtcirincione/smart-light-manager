function Login() {




    return (
        <div className="">
            <h1 className="flex justify-center text-3xl">John's Lights</h1>
            <div className="flex justify-center">
                <div className="ml-5 mt-16">
                    <span className="flex justify-center border-black border-opacity-40 border rounded-md py-3  w-auto text-2xl">Login!</span>
                    <img src="/lights.jpg" alt="lights" className="mt-10 p-3 w-[300px]"></img>
                    <div className="flex justify-end items-center mt-4">Username: <input placeholder="username" className="p-2 mt-4 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg"/></div>
                    <div className="flex justify-end items-center mt-4">Password: <input placeholder="password" className="p-2 mt-4 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg"/></div>
                </div>
            </div>
            <div className="">
                
            </div>
        </div>
    );
}

export default Login