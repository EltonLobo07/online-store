import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { useState, useRef } from "react";
import DisplayError from "./components/DisplayError";

function App() {
    const userInLS = window.localStorage.getItem("user");
    const [user, setUser] = useState(() => userInLS ? JSON.parse(userInLS) : undefined);
    const ref = useRef(null);

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
