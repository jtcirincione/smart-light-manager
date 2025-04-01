import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const ENDPOINT = "wss://lights.john-projects.org";

const useBrightness = () => {
  const [brightness, setBrightness] = useState(50); // Default placeholder value
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(ENDPOINT, {
      transports: ["websocket"],
      upgrade: false,
      path: "/server/socket.io",
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket for brightness");
      socketRef.current.emit("getBrightness"); // Request initial brightness
    });

    socketRef.current.on("brightnessUpdate", (newBrightness) => {
      console.log("I SHOULD BE SEEING THIS")
      setBrightness(newBrightness);
      setLoading(false);
    });

    return () => {
      socketRef.current.off("brightnessUpdate")
      socketRef.current.off("connect");
      socketRef.current.disconnect();
    };
  }, []);

  const updateBrightness = (newValue) => {
    setBrightness(newValue); // Optimistic UI update
    if (socketRef.current) {
      socketRef.current.emit("setBrightness", newValue);
    }
  };

  return { brightness, loading, updateBrightness };
};

export default useBrightness;