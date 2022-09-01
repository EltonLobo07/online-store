import { useNavigate, useOutletContext } from "react-router-dom";
import React, { useState, useEffect } from "react";
import userService from "../services/users";
import ShoppingCartProduct from "./ShoppingCartProduct";
import orderService from "../services/orders";
import EditAddress from "./EditAddress";

function Checkout() {
    const [productsToBuy, setProductsToBuy] = useState([]);
    const [user, _, displayErr] = useOutletContext();
    const navigateFunc = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);

    async function handleClick() {
        try {
            await orderService.order(user.token, user.id);
            displayErr("Order successful!", false);
            setProductsToBuy([]);
        }
        catch(err) {
            displayErr(err?.response?.data?.error || err.message);
        }
    };

    useEffect(() => {
        if (user)
        {
            userService.getShoppingCartProductsDetailed(user.id, user.token)
                       .then(checkoutProducts => {
                            const tmpCheckoutProducts = [];
                            let tmpTotalPrice = 0;

                            for (let i = 0; i < checkoutProducts.length; i++) {
                                tmpTotalPrice += checkoutProducts[i].product.price * checkoutProducts[i].quantity;
                                tmpCheckoutProducts.push(
                                    {
                                        ...checkoutProducts[i].product,
                                        quantity: checkoutProducts[i].quantity
                                    }
                                );
                            }

                            setProductsToBuy(tmpCheckoutProducts);
                            setTotalPrice(tmpTotalPrice);
                        })
                       .catch(err => displayErr(err?.response?.data?.error || err.message));
        }
        else if (user === undefined)
            navigateFunc("/login");
    }, [user]); // useEffect will run only once anyways because user object won't change once set

    // User is not logged in
    if (user === undefined)
        return <div className = "flex-grow"></div>;

    // User is logged in but no product in the shopping cart
    // Also, user might be equal to null
    // If user === null, that means user object is present in the local storage and user state of the app
    // component will be set to that object during the next render
    if (productsToBuy.length === 0)
        return (
            <div className = "flex-grow flex flex-col">
                <div className = "sticky top-12 bg-purple-400 py-1 text-center text-white min-w-[300px]">
                    {user ? `Hi ${user.name}, ` : null}
                    {`Cart : ${productsToBuy.length}`}
                </div>

                <div className = "text-purple-700 flex-grow flex flex-col items-center p-5 w-3/4 min-w-[300px] max-w-screen-lg mx-auto my-5 bg-gray-100 rounded-lg">
                    No products in the cart
                </div>
            </div>
        );

    return (
        <div className = "flex-grow flex flex-col">
            <div className = "sticky top-12 bg-purple-400 py-1 text-center text-white min-w-[300px]">
                {user ? `Hi ${user.name}, ` : null}
                {`Cart : ${productsToBuy.length}`}
            </div>

            <div className = "flex flex-col items-center gap-y-10 p-5 w-3/4 min-w-[300px] max-w-screen-lg mx-auto my-5 bg-gray-100 rounded-lg">
                {productsToBuy.map(product => <ShoppingCartProduct key = {product.id}
                                                                   product = {product}
                                                                   user = {user} 
                                                                   productsToBuy = {productsToBuy}
                                                                   setProductsToBuy = {setProductsToBuy} 
                                                                   totalPrice = {totalPrice}
                                                                   setTotalPrice = {setTotalPrice}
                                                                   displayErr = {displayErr} ></ShoppingCartProduct>)}

                <div className = "text-lg text-purple-700 font-medium">
                    Total price: ${totalPrice.toFixed(2)}
                </div>

                <EditAddress user = {user} displayErr = {displayErr} />

                <button onClick = {handleClick} className = "btn">
                    Order
                </button>
            </div>
        </div>
    );
};

export default Checkout;
