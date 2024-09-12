import React, { useState } from "react";
import { json } from "react-router-dom";

function UserCard({ username }) {
    const [isActive, setIsActive] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false)
    const handleMouseDown = () => {
        setIsActive(true);
    };


    const postUser = async () => {
        const response = await fetch(`/server/${username}/permissions/manager`, {
            method: "POST",
            headers: {
                "Content-Length": 0,
            },
        });
        
        if (response.status != 200) {
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

    return (
        <div
            className={`border-black border rounded-md m-4 p-2 flex flex-col
                        ${isActive ? 'bg-blue-500 cursor-pointer' : 'bg-blue-500 hover:bg-blue-300 cursor-pointer'}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // To reset color if mouse leaves while pressed
            onClick={handleClick}
        >
            user: {username}
            {isExpanded && 
            <div className={`justify-end flex h-auto`}>
                <button className={`bg-green-400 px-1 mt-2 border border-green-600 rounded-md hover:bg-green-200 active:bg-green-400`}
                onClick={handleAddClick}
                onMouseDown={stopMouseDown}
                onMouseUp={stopMouseUp}>add</button>
            </div>}
        </div>
    );
}

export default UserCard;