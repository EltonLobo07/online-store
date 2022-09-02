import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import PropTypes from "prop-types";

function Menu({ user, setUser }) {
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
        <div className = "hidden md:flex items-center gap-x-10 relative">
            <Link to = "/" onClick = {closeDropDown} className = "border border-purple-700 hover:border-white p-1">
                Home
            </Link>

            <Link to = "/products" onClick = {closeDropDown} className = "border border-purple-700 hover:border-white p-1">
                Products
            </Link>

            <Link to = "/checkout" onClick = {closeDropDown} className = "border border-purple-700 hover:border-white p-1">
                Checkout
            </Link>

            <button onClick = {toggleDropDown} className = "border border-purple-700 hover:border-white p-1">
                <svg xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 24 24" strokeWidth = "1.5" stroke = "currentColor" className = "w-6 h-6 stroke-white fill-purple-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>

            <div className = {`${boxHidden ? "hidden" : "block"} absolute top-10 right-0 flex flex-col text-purple-700 bg-white border border-purple-700 border-t-0 w-max`}>
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
    );
};

Menu.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired
};

export default Menu;