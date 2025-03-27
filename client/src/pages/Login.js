import { useState } from "react";
import UnauthenticatedHeader from "../components/UnauthenticatedHeader";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!username || !password) {
      alert("Missing required fields!");
      return;
    }

    const response = await fetch("/server/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include", // Ensures cookies are saved for sessions if needed
    });

    console.log("Status: " + response.status);

    if (response.status === 200) {
      window.location.href = "/"; // Redirect after successful login (triggers password save)
    } else {
      let data = await response.json();
      alert(data.message);
    }
  };

  return (
    <UnauthenticatedHeader>
      <div className="flex justify-center">
        <div className="ml-5 mt-16">
          <span className="flex justify-center border-black border-opacity-40 border rounded-md py-3 w-auto text-2xl">
            Login!
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
                autoComplete="username" // Helps browser recognize username field
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
                autoComplete="current-password" // Helps browser recognize password field
                required
                className="p-2 mt-2 ml-2 text-md font-bold border border-gray-900 rounded-lg drop-shadow-lg"
              />
            </label>

            <button
              type="submit"
              className="mt-10 mb-8 border py-1 px-5 rounded-md border-black bg-green-300 w-full hover:bg-green-500 active:bg-green-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </UnauthenticatedHeader>
  );
}

export default Login;