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
                User
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