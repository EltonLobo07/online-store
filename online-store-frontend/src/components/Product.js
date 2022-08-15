import PropTypes from "prop-types";
import StyledButton from "./Button";
import styled from "styled-components";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";

const StyledProduct = styled.div`
    height: 350px;

    display: flex;
    flex-direction: column;

    gap: 8px;
    padding: 8px;

    background-color: white;

    border-radius: 4px;
    border: 1px solid rgba(229, 231, 235);

    div:nth-child(2) {
        border-top: 1px solid rgba(229, 231, 235);
        padding-top: 8px;
        height: 100px;
        overflow: hidden;
    }

    > div > img {
        width: 100%;
        height: 150px;

        object-fit: contain;
    }
`;

function Product({ user, product, productsInTheCart, setProductsInTheCart }) {
    const inTheCart = productsInTheCart[product.id] !== undefined;
    const navigate = useNavigate();

    async function handleCartClick() {
        if (user) {
            try {
                if (inTheCart) {
                    await userService.removeShoppingCartProduct(product.id, user.id, user.token);
                    const productsInTheCartCopy = {...productsInTheCart};
                    delete productsInTheCartCopy[product.id];

                    setProductsInTheCart(productsInTheCartCopy);
                }
                else {
                    await userService.addProductToShoppingCart({productId: product.id}, user.id, user.token);
                    
                    const obj = {};
                    obj[product.id] = 1;

                    setProductsInTheCart({...productsInTheCart, ...obj});
                } 
            }
            catch(err) {
                alert(err?.response?.data?.error || err.message);
            }
        }
    };

    function handleMoreDetailsClick() {
        navigate(product.id);
    };

    return (
        <StyledProduct>
            <div>
                <img src = {product.image} alt = {product.title} />
            </div>
            <div style = {{fontWeight: 600}}>{product.title}</div>
            <div>${product.price}</div>
            <StyledButton onClick = {handleCartClick} inTheCart = {inTheCart}>{inTheCart ? "Remove from the cart" : "Add to the cart"}</StyledButton>
            <StyledButton onClick = {handleMoreDetailsClick}>More details</StyledButton>
        </StyledProduct>
    );
};

Product.propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object,
    productsInTheCart: PropTypes.object.isRequired,
    setProductsInTheCart: PropTypes.func.isRequired
};

export default Product;
