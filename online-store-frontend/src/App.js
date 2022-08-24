import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { useEffect, useState } from "react";

function App() {
    const [user, setUser] = useState(window.localStorage.getItem("user") ? null : undefined);

    useEffect(() => {
        if (window.localStorage.getItem("user"))
            setUser(JSON.parse(window.localStorage.getItem("user")));
    }, []);

    return (
        <div>
            <Header user = {user} setUser = {setUser} />
            <Outlet context = {[user, setUser]} />
            <Footer />
        </div>
    );
};

export default App;
