import { useState } from 'react';
import UnauthenticatedHeader from '../components/UnauthenticatedHeader';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const submit = async (event) => {
        event.preventDefault(); // Prevent default form behavior

        if (!username || !password || !email) {
            alert("Missing required fields!");
            return;
        }

        try {
            const response = await fetch("/server/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
                credentials: "include", // Ensures session cookies are stored if needed
            });

            if (response.status === 201) {
                alert("Account created successfully!");
                window.location.href = "/login"; // Redirect triggers the browser's password save prompt
            } else {
                const data = await response.json();
                alert("Invalid username or password: " + data.message);
            }
        } catch (err) {
            alert("Unknown Error");
        }
    };

    return (
        <UnauthenticatedHeader>
            <div className="flex justify-center">
                <div className="ml-5 mt-16">
                    <span className="flex justify-center border-black border-opacity-40 border rounded-md py-3 w-auto text-2xl">
                        Signup
                    </span>
                    <img src="/lights.jpg" alt="lights" className="mt-10 p-3 w-[300px]" />

                    {/* Use a form for better browser password recognition */}
                    <form onSubmit={submit} className="flex flex-col items-end mt-4">
                        <label className="flex items-center">
                            Username:
                            <input
                                type="text"
                                name="username"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                required
                                className="p-2 mt-2 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg"
                            />
                        </label>

                        <label className="flex items-center mt-4">
                            Email:
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                                className="p-2 mt-2 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg"
                            />
                        </label>

                        <label className="flex items-center mt-4">
                            Password:
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password" // Ensures the browser recognizes this as a signup password field
                                required
                                className="p-2 mt-2 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg"
                            />
                        </label>

                        <a
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mt-4"
                            href="/login"
                        >
                            I already have an account
                        </a>

                        <button
                            type="submit"
                            className="mt-10 border py-1 px-5 rounded-md border-black bg-green-300 w-full mb-8 hover:bg-green-500 active:bg-green-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </UnauthenticatedHeader>
    );
}

export default Signup;
