import React, { useState, useRef, useImperativeHandle } from "react";

const DisplayError = React.forwardRef((props, ref) => {
    const [errMsg, setErrMsg] = useState("");
    const [hidden, setHidden] = useState(true);
    const [color, setColor] = useState("");
    const timeoutId = useRef(null);

    function displayErr(msg, isErr = true) {
        setErrMsg(msg);
        setHidden(false);
        setColor(isErr ? "bg-red-500" : "bg-green-500");

        clearTimeout(timeoutId.current);

        timeoutId.current = setTimeout(() => {
                                        setErrMsg("");
                                        setHidden(true);
                                       }, 5000);
    };

    useImperativeHandle(ref, () => displayErr);

    return (
        <div className = {`fixed z-10 top-24 w-full ${hidden ? "hidden" : "block"}`}>
            <div className = {`border text-white font-medium p-6 w-1/2 mx-auto ${color}`}>
                {errMsg}
            </div>
        </div>
    );
});

export default DisplayError;
