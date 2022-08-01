import { Link } from "react-router-dom"; 
import styled from "styled-components";

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

function Menu() {
    return (
        <StyledMenu>
            <Link to = "/">Home</Link>
            <Link to = "/products">Products</Link>
            <Link to = "/checkout">Checkout</Link>
            <div>Logo</div>
        </StyledMenu>
    );
};

export default Menu;