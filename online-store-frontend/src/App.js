import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { useEffect, useState, useRef } from "react";
import DisplayError from "./components/DisplayError";

function App() {
    const [user, setUser] = useState(window.localStorage.getItem("user") ? null : undefined);
    const ref = useRef(null);

    useEffect(() => {
        if (window.localStorage.getItem("user"))
            setUser(JSON.parse(window.localStorage.getItem("user")));
    }, []);

    return (
        <div className = "h-full flex flex-col">
            <Header user = {user} setUser = {setUser} />
            <div className = "h-12 w-full shrink-0"></div>

            <DisplayError ref = {ref} />

            <Outlet context = {[user, setUser, ref.current]} />
            <Footer />
        </div>
    );
};

export default App;
