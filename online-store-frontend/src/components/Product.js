import React from "react";
import PropTypes from "prop-types";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";

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
        <div style = {{border: "1px solid black"}}>
            <div>
                <img src = "" alt = {product.title} />
            </div>
            <div style = {{fontWeight: 600}}>{product.title}</div>
            <div>${product.price}</div>
            <button onClick = {handleCartClick}>{inTheCart ? "Remove from cart" : "Add to cart"}</button>
            <button onClick = {handleMoreDetailsClick}>More details</button>
        </div>
    );
};

Product.propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object,
    productsInTheCart: PropTypes.object.isRequired,
    setProductsInTheCart: PropTypes.func.isRequired
};

export default Product;
