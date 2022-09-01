import React from "react";
import PropTypes from "prop-types";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";

function Product({ user, product, productsInTheCart, setProductsInTheCart, DisplayErr }) {
    const inTheCart = productsInTheCart.has(product.id);
    const navigate = useNavigate();

    async function handleButtonClick() {
        if (user) {
            try {
                const productsInTheCartCopy = new Set(productsInTheCart);

                if (inTheCart) {
                    await userService.removeShoppingCartProduct(product.id, user.id, user.token);
                    productsInTheCartCopy.delete(product.id);
                }
                else {
                    await userService.addProductToShoppingCart({productId: product.id}, user.id, user.token);
                    productsInTheCartCopy.add(product.id);
                } 

                setProductsInTheCart(productsInTheCartCopy);
            }
            catch(err) {
                DisplayErr(err?.response?.data?.error || err.message);
            }
        }
        else
            navigate("/login");
    };

    function handleCardClick(e) {
        if (e.target.tagName !== "BUTTON")
            navigate(product.id);
    };

    return (
        <div onClick = {handleCardClick} className = "bg-white rounded-lg shadow-sm shadow-gray-400 hover:shadow-lg hover:shadow-gray-600 p-4 cursor-pointer">
            <div className = "h-1/2 border-b-2 border-gray-300 p-1 mb-1 bg-white">
                <img src = {product.image} alt = {product.title} className = "h-full w-full object-contain" />
            </div>

            <div className = "h-1/4 font-medium overflow-auto">
                {product.title}
            </div>

            <div className = "font-medium text-lg text-purple-700 overflow-auto">
                ${product.price.toFixed(2)}
            </div>

            <button onClick = {handleButtonClick} className = {`w-full ${inTheCart ? "p-2 border border-purple-700 bg-white text-purple-700 font-medium rounded-md hover:bg-gray-200 active:bg-gray-300" : "btn"}`}>
                {inTheCart ? "Remove from cart" : "Add to cart"}
            </button>
        </div>
    );
};

Product.propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object,
    productsInTheCart: PropTypes.object.isRequired,
    setProductsInTheCart: PropTypes.func.isRequired,
    DisplayErr: PropTypes.func.isRequired
};

export default Product;
