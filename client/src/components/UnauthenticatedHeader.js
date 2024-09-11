import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

function UnautheticatedHeader({ children }) {
    return (
        <>
            <div className="z-10 mx-auto bg-blue-500">
                <Link to="/signup" className="block">
                    <h1 className="pt-4 mx-auto text-5xl font-extrabold pb-3">
                        <span className="text-">John's</span>
                        <span className="text-white">Lights</span>
                    </h1>
                </Link>
            </div>
            {children}
        </>
    );
}

export default UnautheticatedHeader;