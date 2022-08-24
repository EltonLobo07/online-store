import React from "react";
import Menu from "./Menu";
import PropTypes from "prop-types";

function Header({ user, setUser }) {
    return (
        <div>
            <div>
                <div>Fake Store</div>
                <Menu user = {user} setUser = {setUser} />
            </div>
        </div>
    );
};

Header.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired
};

export default Header;