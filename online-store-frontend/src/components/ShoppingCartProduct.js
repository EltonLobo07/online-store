import PropTypes from "prop-types";
import userService from "../services/users";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function toggleInputAndFocus(e) {
    /*
        When element's disable = true, focus will be on the element
        
        Needed because when a user changes quantity of a product which is in the cart,
        the updation in the database is slow. Till the time the database is not updated,
        the input should be disabled
    */

    e.target.disabled = !e.target.disabled;
    e.target.focus();
};

function ShoppingCartProduct({ product, user, productsToBuy, setProductsToBuy, totalPrice, setTotalPrice, displayErr }) {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(product.quantity);

    async function handleClick() {
        const responseStatus = await userService.removeShoppingCartProduct(product.id, user.id, user.token);

        if (responseStatus === 204)
        {
            setProductsToBuy(productsToBuy.filter(curProduct => curProduct.id !== product.id));
            setTotalPrice(totalPrice -  quantity * product.price);
        }
    };

    async function handleQuantityChange(e) {
        const enteredQuantity = Math.min(Math.max(Number(e.target.value), 0), 1000000);

        try {
                toggleInputAndFocus(e);
                const returnedQuantity = await userService.updateShoppingCartProduct(user.token, user.id, product.id, enteredQuantity);
                setTotalPrice(totalPrice + (returnedQuantity - quantity) * product.price);
                setQuantity(returnedQuantity);
                toggleInputAndFocus(e);
        }
        catch (err) {
            displayErr(err?.response?.data?.error || err.message);
        }
    };

    function handleAboutClick() {
        navigate(`/products/${product.id}`);
    }

    return (
        <div className = {`w-3/4 min-w-[280px] p-2 flex flex-col gap-y-4 md:flex-row md:gap-x-4 bg-white rounded-lg shadow-lg ${quantity ? "shadow-green-400" : "shadow-red-400"}`}>
            <div className = "w-full md:w-1/3 h-52 bg-white">
                <img src = {product.image} alt = {product.title + " image"} className = "w-full h-full object-contain p-2 bg-white" />
            </div>

            <div className = "flex flex-col gap-y-4 p-2 w-full">
                <div className = "font-medium">
                    {product.title}
                </div>

                <div className = "flex items-center gap-x-2">
                    <label htmlFor = "quantity">
                        Quantity: 
                    </label>
                    <input type = "number" id = "quantity" value = {String(quantity)} onChange = {handleQuantityChange} className = "bg-gray-100 p-1 border border-white outline-none focus:border-purple-700 rounded-sm w-24 overflow-auto" />
                </div>
                
                <div className = "flex gap-x-4">
                    <button onClick = {handleClick} className = "btn">delete</button>

                    <button onClick = {handleAboutClick} className = "btn">about</button>
                </div>

                <div className = "flex-grow flex justify-end items-end">
                    <div className = "font-medium text-lg text-purple-700">
                        ${(quantity * product.price).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
};

ShoppingCartProduct.propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object,
    productsToBuy: PropTypes.array.isRequired,
    setProductsToBuy: PropTypes.func.isRequired,
    totalPrice: PropTypes.number.isRequired,
    setTotalPrice: PropTypes.func.isRequired,
    displayErr: PropTypes.func.isRequired
};

export default ShoppingCartProduct;
