    import AuthenticatedHeader from "../components/AuthenticatedHeader";
    import React, { useState, useEffect, useRef } from "react";
    import { ColorPicker, useColor } from 'react-color-palette';
    import { useAuth } from "../components/AuthProvider";
    import "react-color-palette/css";
    import io from 'socket.io-client';
    import Slider from "../components/Slider";
    import useBrightness from "../components/useBrightness";

    function Home() {
        const [color, setColor] = useColor("#561ecb");
        const [on, setOn] = useState(false)
        const ENDPOINT = "wss://lights.john-projects.org";
        const socketRef = useRef();
        const {permissions, isAuthenticated} = useAuth();
        const {brightness, loading, updateBrightness} = useBrightness();

        useEffect(() => {
        }, [permissions]);

        useEffect(() => {
            socketRef.current = io(ENDPOINT, {
                transports: ['websocket'],
                upgrade: false,
                path: '/server/socket.io'
            });

            socketRef.current.on('connect', () => {
                socketRef.current.emit('my event', { data: 'I\'m connected!' });
            });

            const fetchStatus = async () => {
                await getStatus(); // Ensure status is fetched
            };
            fetchStatus(); // Call the async function

            // Cleanup on component unmount
            return () => {
                socketRef.current.off('connect'); // Remove listener
                socketRef.current.disconnect();
            };
        }, [ENDPOINT]);

        const turnOff = async () => {
            const response = await fetch("/server/lights/off");
            await getStatus();
            if (response.status !== 200) {
                alert("Nice try but you really think I'd let anyone mess with my lights?");
            }
        };

        const turnOn = async () => {
            const response = await fetch("/server/lights/on");
            await getStatus();
            if (response.status !== 200) {
                alert("Nice try but you really think I'd let anyone mess with my lights?");
            }
        };

        const handleSetColor = (color) => {
            setColor(color);
            socketRef.current.emit("color", color); // Use the ref to access the socket
        }

        const getStatus = async () => {
            let res = await fetch("/server/lights/status")
            while (res.status !== 200 && res.status != 403) { // retry upon api error
                res = await fetch("/server/lights/status")
            }
            let data = await res.json()
            if (data.status == "on") {
                setOn(true)
            }
            else {
                setOn(false)
            }
        }

        return (
            <AuthenticatedHeader>
                <div>
                    {permissions.includes("MANAGER") && <span>Lights are currently: {on ? "on!" : "off."} </span>}
                    <div className="flex justify-center">
                        <button className="mt-10 mx-4 mb-8 border py-1 px-24 rounded-md border-black bg-green-300 hover:bg-green-500 active:bg-green-300
                        disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed" onClick={turnOn} disabled={on}>
                            on
                        </button>
                        <button className="mt-10 mx-4 mb-8 border py-1 px-24 rounded-md border-black bg-green-300 hover:bg-green-500 active:bg-green-300
                        disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed" onClick={turnOff} disabled={!on}>
                            off
                        </button>
                    </div>
                    <ColorPicker color={color} onChange={handleSetColor} />
                    {permissions.includes("MANAGER") && (loading ? <p>retrieving brightness value...</p> : <Slider value={brightness} onChange={updateBrightness} />)}
                </div>
            </AuthenticatedHeader>
        );
    }

    export default Home;