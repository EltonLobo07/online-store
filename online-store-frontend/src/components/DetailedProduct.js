import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../services/products";
import { useOutletContext } from "react-router-dom";
import userService from "../services/users";

function DetailedProduct() {
    const [product, setProduct] = useState(null);
    const [inTheCart, setInTheCart] = useState(false);
    const [user, _, displayErr] = useOutletContext();
    const { id } = useParams();
    const navigate = useNavigate();

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
                displayErr(err?.response?.data?.error || err.message);
            }
        }
        else
            navigate("/login");
    };

    useEffect(() => {
        productService.getOneProduct(id)
                      .then(product => setProduct(product))
                      .catch(err => displayErr(err?.response?.data?.error || err.message));
    }, [id]);

    useEffect(() => {
        if (user) {
            userService.isProductPresentInTheCart(user.token, user.id, id)
                       .then(inTheCart => setInTheCart(inTheCart))
                       .catch(err => displayErr(err?.response?.data?.error || err.message));
        }
    }, [user]);

    if (product === null)
        return <div className = "flex-grow"></div>;

    return (
        <div className = "flex-grow flex justify-center py-8 w-3/4 min-w-[300px] max-w-screen-lg mx-auto my-5 bg-gray-100 rounded-lg">
            <div className = "flex flex-col gap-y-2 p-4 min-w-[280px] w-1/2 rounded-lg bg-white shadow-md shadow-gray-300 h-min">
                <div className = "self-center h-56 w-56 bg-white p-4">
                    <img src = {product.image} alt = "product image" className = "h-full w-full object-contain" />
                </div>

                <h3 className = "font-medium text-lg">
                    {product.title}
                </h3>

                <div>{product.description}</div>

                <div className = "font-medium text-lg text-purple-700">
                    ${product.price.toFixed(2)}
                </div>

                <button onClick = {handleCartClick} className = {`w-full ${inTheCart ? "p-2 border border-purple-700 bg-white text-purple-700 font-medium rounded-md hover:bg-gray-200 active:bg-gray-300" : "btn"}`}>
                    {inTheCart ? "Remove from the cart" : "Add to the cart"}
                </button>
            </div>
        </div>
    );
};

export default DetailedProduct;
