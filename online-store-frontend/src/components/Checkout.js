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
        return <div className = "flex-grow"></div>;

    if (productsToBuy.length === 0) // User is logged in
        return (
            <div className = "flex-grow">
                No products in the cart
            </div>
        );

    return (
        <div className = "flex-grow flex flex-col">
            <div className = "sticky top-12 bg-purple-400 py-1 text-center text-white min-w-[300px]">
                {user ? `Hi ${user.name}, ` : null}
                {`Cart : ${productsToBuy.length}`}
            </div>

            <div className = "flex flex-col items-center gap-y-10 p-5 w-3/4 min-w-[300px] max-w-screen-lg mx-auto my-5 bg-gray-200 rounded-lg">
                {productsToBuy.map(product => <ShoppingCartProduct key = {product.id}
                                                                   product = {product}
                                                                   user = {user} 
                                                                   productsToBuy = {productsToBuy}
                                                                   setProductsToBuy = {setProductsToBuy} 
                                                                   totalPriceObj = {ref} ></ShoppingCartProduct>)}

                <DisplayTotalPrice initialTotalPrice = {initialTotalPrice} ref = {ref} />

                <EditAddress user = {user} />

                <button onClick = {handleClick} className = "btn">
                    Order
                </button>
            </div>
        </div>
    );
};

export default Checkout;
