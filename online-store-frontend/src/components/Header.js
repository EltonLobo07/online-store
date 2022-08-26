import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import PropTypes from "prop-types";

function Header({ user, setUser }) {
    const navigate = useNavigate();
    const [boxHidden, setBoxHidden] = useState(true);

    function toggleDropDown() {
        setBoxHidden(!boxHidden);
    };

    function closeDropDown() {
        setBoxHidden(true);
    };

    function handleLogoutAndCloseDropDown() {
        window.localStorage.removeItem("user");
        setUser(undefined);
        setBoxHidden(true);
        navigate("/");
    };

    return (
        <div className = "bg-purple-700 text-white w-full flex items-center justify-around h-12 fixed z-10">
            <div className = "flex gap-x-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 bg-purple-700 stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                </svg>

                <div className = "text-2xl">Fake Store</div>
            </div>

            <Menu user = {user} setUser = {setUser} />
            
            <div className = "md:hidden relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick = {toggleDropDown} className="w-6 h-6 bg-purple-700 stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <div className = {`${boxHidden ? "hidden" : "block"} absolute top-9 right-0 flex flex-col text-purple-700 bg-white border border-purple-700 border-t-0 w-max`}>
                    <Link to = "/home" onClick = {closeDropDown} className = "hover:bg-gray-100 p-2">
                        Home
                    </Link>

                    <Link to = "/products" onClick = {closeDropDown} className = "hover:bg-gray-100 p-2">
                        Products
                    </Link>

                    <Link to = "/checkout" onClick = {closeDropDown} className = "hover:bg-gray-100 p-2">
                        Checkout
                    </Link>

                    {
                        user ? 
                            <>
                                <Link to = "/your-orders" onClick = {closeDropDown} className = "hover:bg-gray-100 p-2">
                                    Your orders
                                </Link>

                                <div onClick = {handleLogoutAndCloseDropDown} className = "cursor-pointer hover:bg-gray-100 p-2">
                                    Logout
                                </div>
                            </>
                            : 
                            <>
                                <Link to = "/login" onClick = {closeDropDown} className = "hover:bg-gray-100 p-2">
                                    Login
                                </Link>

                                <Link to = "/signup" onClick = {closeDropDown} className = "hover:bg-gray-100 p-2">
                                    Signup
                                </Link>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired
};

export default Header;