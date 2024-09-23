import AuthenticatedHeader from "../components/AuthenticatedHeader";
import React, { useState, useEffect, useRef } from "react";
import { ColorPicker, useColor } from 'react-color-palette';
import "react-color-palette/css";
import io from 'socket.io-client';

function Home() {
    const [color, setColor] = useColor("#561ecb");
    const ENDPOINT = "wss://lights.john-projects.org";
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io(ENDPOINT, {
            transports: ['websocket'],
            upgrade: false,
            path: '/server/socket.io'
        });

        socketRef.current.on('connect', () => {
            socketRef.current.emit('my event', { data: 'I\'m connected!' });
        });

        // Cleanup on component unmount
        return () => {
            socketRef.current.off('connect'); // Remove listener
            socketRef.current.disconnect();
        };
    }, [ENDPOINT]);

    const turnOff = async () => {
        const response = await fetch("/server/lights/off");
        if (response.status !== 200) {
            alert("Nice try but you really think I'd let anyone mess with my lights?");
        }
    };

    const turnOn = async () => {
        const response = await fetch("/server/lights/on");
        if (response.status !== 200) {
            alert("Nice try but you really think I'd let anyone mess with my lights?");
        }
    };

    const handleSetColor = (color) => {
        setColor(color);
        socketRef.current.emit("color", color); // Use the ref to access the socket
    }

    return (
        <AuthenticatedHeader>
            <div>
                <div className="flex justify-center">
                    <button className="mt-10 mx-4 mb-8 border py-1 px-24 rounded-md border-black bg-green-300" onClick={turnOn}>
                        on
                    </button>
                    <button className="mt-10 mx-4 mb-8 border py-1 px-24 rounded-md border-black bg-green-300" onClick={turnOff}>
                        off
                    </button>
                </div>
                <ColorPicker color={color} onChange={handleSetColor} />
            </div>
        </AuthenticatedHeader>
    );
}

export default Home;