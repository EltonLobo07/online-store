import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import PropTypes from "prop-types";

function Menu({ user, setUser }) {
    const navigate = useNavigate();

    function handleClick() {
        window.localStorage.removeItem("user");
        setUser(undefined);
        navigate("/");
    };

    return (
        <div>
            <Link to = "/">Home</Link>
            <Link to = "/products">Products</Link>
            <Link to = "/checkout">Checkout</Link>

            {user ? <button onClick = {handleClick}>
                        {`${user.name}`}
                    </button> :
                    <Link to = "/login">LogIn</Link>}
        </div>
    );
};

Menu.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired
};

export default Menu;