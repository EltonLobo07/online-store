import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/products";
import { useOutletContext } from "react-router-dom";
import userService from "../services/users";

function DetailedProduct() {
    const [product, setProduct] = useState(null);
    const [inTheCart, setInTheCart] = useState(false);
    const [user] = useOutletContext();
    const { id } = useParams();

    async function handleCartClick() {
        if (user) {
            try {
                if (inTheCart)
                    await userService.removeShoppingCartProduct(product.id, user.id, user.token);
                else 
                    await userService.addProductToShoppingCart({productId: product.id}, user.id, user.token);

                setInTheCart(!inTheCart);
            }
            catch(err) {
                alert(err?.response?.data?.error || err.message);
            }
        }
    };

    useEffect(() => {
        productService.getOneProduct(id)
                      .then(product => setProduct(product))
                      .catch(err => alert(err?.response?.data?.error || err.message));

        if (user) {
            userService.isProductPresentInTheCart(user.token, user.id, id)
                          .then(inTheCart => setInTheCart(inTheCart))
                          .catch(err => alert(err?.response?.data?.error || err.message));
        }
    }, [user, id]);

    if (product === null)
        return null;

    return (
        <div>
            <img src = {product.image} alt = "product img" width = "100px" height = "100px" />
            <h3>{product.title}</h3>
            <div>Price: <span>$ {product.price}</span></div>
            <button onClick = {handleCartClick}>{inTheCart ? "Remove from the cart" : "Add to the cart"}</button>
        </div>
    );
};

export default DetailedProduct;
