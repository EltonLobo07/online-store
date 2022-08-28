import React from "react";
import { useNavigate } from "react-router-dom";

function UnknownPath() {
    const navigate = useNavigate();

    return (
        <div className = "h-full flex flex-col gap-y-2 justify-center items-center border border-gray-100 text-purple-700 text-lg">
            <div className = "font-medium">
                Nothing here, head back to the home page using the button below
            </div>

            <button onClick = {() => navigate("/")} className = "btn">
                Go to home page
            </button>
        </div>
    );
};

export default UnknownPath;
