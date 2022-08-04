import { Link, useNavigate } from "react-router-dom"; 
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > a 
    {
        text-decoration: none;
        color: white;
    }
`;

function Menu({ user, setUser }) {
    const navigate = useNavigate();

    function handleClick() {
        window.localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <StyledMenu>
            <Link to = "/">Home</Link>
            <Link to = "/products">Products</Link>
            <Link to = "/checkout">Checkout</Link>

            {user ? <button onClick = {handleClick}>
                        {`${user.email.substring(0, user.email.indexOf("@"))} (${user.shoppingCartItems.length})`}
                    </button> :
                    <Link to = "/login">LogIn</Link>}
        </StyledMenu>
    );
};

Menu.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired
};

export default Menu;