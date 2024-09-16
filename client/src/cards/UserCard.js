import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";

function UserCard({ user }) {
    const [isActive, setIsActive] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false)
    const [isAdded, setIsAdded] = useState(false)

    const handleMouseDown = () => {
        setIsActive(true);
    };

    useEffect(() => {
        const checkIsAdded = async () => {
            if (user.roles.includes("MANAGER")) {
                setIsAdded(true)
            }
            else {
                setIsAdded(false)
            }
        };
        checkIsAdded();
    }, [user.roles])

    const postUser = async () => {
        const response = await fetch(`/server/${user.username}/permissions/manager`, {
            method: "POST",
            headers: {
                "Content-Length": 0,
            },
        });
        
        if (response.status == 200 ) {
            setIsAdded(true);
        } 
        else if (response.status == 400) {
            const data = await response.json();
            setIsAdded(true);
            alert(data.message)
        }
        else {
            const data = await response.json();
            alert(data.message);
        }
    };

    const handleMouseUp = () => {
        setIsActive(false);
    };

    const handleClick = () => {
        if (isExpanded) {
            setIsExpanded(false)
        }
        else {
            setIsExpanded(true)
        }
    };

    const handleAddClick = (event) => {
        event.stopPropagation();
        postUser()
    };

    const stopMouseDown = (event) => {
        event.stopPropagation();
    };

    const stopMouseUp = (event) => {
        event.stopPropagation();
    };


    const handleDelete = async (event) => {
        event.stopPropagation()
        const response = await fetch(`/server/${user.username}/permissions/manager`, {
            method: "DELETE",
        });
        if (response.status != 200) {
            const data = await response.json()
            alert(data.message)
        }  
        else {
            setIsAdded(false);
        }      
    }

    return (
        <div
            className={`border-black border rounded-md m-4 p-2 flex flex-col
                        ${isActive ? 'bg-blue-500 cursor-pointer' : 'bg-blue-500 hover:bg-blue-300 cursor-pointer'}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // To reset color if mouse leaves while pressed
            onClick={handleClick}
        >
            user: {user.username}
            {isExpanded && 
            <div className={`justify-end flex h-auto`}>
                {isAdded && <button className={`bg-red-400 px-1 mt-2 border border-red-600 rounded-md hover:bg-red-200 active:bg-red-400`}
                onClick={handleDelete}
                onMouseDown={stopMouseDown}
                onMouseUp={stopMouseUp}>delete</button>}
                <button className={`bg-green-400 px-1 mt-2 border border-green-600 rounded-md hover:bg-green-200 active:bg-green-400`}
                onClick={handleAddClick}
                onMouseDown={stopMouseDown}
                onMouseUp={stopMouseUp}>{isAdded ? <>added!</> : <>add</>}</button>
                
            </div>}
        </div>
    );
}

export default UserCard;