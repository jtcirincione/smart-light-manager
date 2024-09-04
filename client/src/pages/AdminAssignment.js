import { useState, useEffect } from "react";

function AdminAssignment() {
    const [password, setPassword] = useState("")

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const submit = async () => {
        const response = await fetch("/server/permissions/admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            
            },
            body: JSON.stringify({password}),
        })
    }

    return (
        <div>
            <span>Password for admin access:</span><input type="password" placeholder="password" value={password} onChange={handlePasswordChange}/>
            <button className="mt-10 mb-8 border py-1 px-5 rounded-md border-black bg-green-300 w-full" onClick={submit}>Submit</button>
        </div>
    )
}

export default AdminAssignment;