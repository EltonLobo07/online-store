import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import userService from "../services/users";
import ShoppingCartProduct from "./ShoppingCartProduct";
import DisplayTotalPrice from "./DisplayTotalPrice";
import orderService from "../services/orders";
import EditAddress from "./EditAddress";

let navigateFunc, initialTotalPrice = 0;

function resetGlobals() {
    initialTotalPrice = 0;
};

function Checkout() {
    const [productsToBuy, setProductsToBuy] = useState([]);
    const [user] = useOutletContext();
    const ref = useRef(null);
    navigateFunc = useNavigate();

    async function handleClick() {
        try {
            await orderService.order(user.token, user.id);
            alert("Order successful!");
            setProductsToBuy([]);
        }
        catch(err) {
            alert(err?.response?.data?.error || err.message);
        }
    };

    useEffect(() => {
        if (user)
        {
            userService.getShoppingCartProductsDetailed(user.id, user.token)
                       .then(checkoutProducts => {
                            const tmpCheckoutProducts = [];

                            for (let i = 0; i < checkoutProducts.length; i++) {
                                initialTotalPrice += checkoutProducts[i].product.price;
                                tmpCheckoutProducts.push({...checkoutProducts[i].product,
                                     quantity: checkoutProducts[i].quantity});
                            }

                            setProductsToBuy(tmpCheckoutProducts);
                        })
                       .catch(err => alert(err?.response?.data?.error || err.message));
        }
        else if (user === undefined)
            navigateFunc("/login", {replace: true});

        return resetGlobals;
    }, [user]);
    // useEffect will run only once anyways

    if (user === undefined) // User is not logged in
        return null;

    if (productsToBuy.length === 0) // User is logged in
        return (
            <div>
                <div>No products in the cart</div>
            </div>
        );

    return (
        <div>
            <div>
                {productsToBuy.map(product => <ShoppingCartProduct key = {product.id}
                                                                   product = {product}
                                                                   user = {user} 
                                                                   productsToBuy = {productsToBuy}
                                                                   setProductsToBuy = {setProductsToBuy} 
                                                                   totalPriceObj = {ref} ></ShoppingCartProduct>)}

                <DisplayTotalPrice initialTotalPrice = {initialTotalPrice} ref = {ref} />

                <EditAddress user = {user} />

                <button onClick = {handleClick}>Order</button>
            </div>
        </div>
    );
};

export default Checkout;
