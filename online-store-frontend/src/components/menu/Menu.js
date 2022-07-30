import { Link } from "react-router-dom"; 
import StyledMenu from "./StyledMenu";

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