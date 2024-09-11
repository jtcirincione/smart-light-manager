import React, { useState } from "react";

function UserCard({ username }) {
    const [isActive, setIsActive] = useState(false);

    const handleMouseDown = () => {
        setIsActive(true);
    };

    const handleMouseUp = () => {
        setIsActive(false);
    };

    return (
        <div
            className={`border-black border rounded-md m-4 p-2 
                        ${isActive ? 'bg-blue-500 cursor-pointer' : 'bg-blue-500 hover:bg-blue-300 cursor-pointer'}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // To reset color if mouse leaves while pressed
        >
            user: {username}
        </div>
    );
}

export default UserCard;