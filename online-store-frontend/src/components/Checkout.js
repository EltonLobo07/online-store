import styled from "styled-components";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import userService from "../services/users";
import ShoppingCartProduct from "./ShoppingCartProduct";
import DisplayTotalPrice from "./DisplayTotalPrice";
import Button from "./Button";
import orderService from "../services/orders";

const StyledCheckout = styled.div` 
    display: flex;
    justify-content: center;

    > div {
        width: min(100%, 1000px);

        background-color: rgba(229, 231, 235, 0.5);
        
        display: grid;
        grid-template: 1fr / min(300px, 1fr);
        justify-content: center;
        padding: 10px;
        gap: 10px;
    }

    > div > button {
        width: 50px;
        height: 50px;
    }
`;

let navigateFunc, initialTotalPrice = 0;

function resetGlobals() {
    initialTotalPrice = 0;
};

function Checkout() {
    const [productsToBuy, setProductsToBuy] = useState([]); 
    const [user] = useOutletContext();
    const ref = useRef(null);
    const navigate = useNavigate();
    navigateFunc = navigate;

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
                            for (let i = 0; i < checkoutProducts.length; i++)
                                initialTotalPrice += checkoutProducts[i].price;

                            setProductsToBuy(checkoutProducts);
                        })
                       .catch(err => alert(err?.response?.data?.error || err.message));
        }
        else if (user === undefined)
            navigateFunc("/login", {replace: true});

        return resetGlobals;
    }, [user, ref]);
    // useEffect will run only once anyways

    if (user === undefined) // User is not logged in
        return null;

    if (productsToBuy.length === 0) // User is logged in
        return (
            <StyledCheckout>
                <div>No products in the cart</div>
            </StyledCheckout>
        );

    return (
        <StyledCheckout>
            <div>
                {productsToBuy.map(product => <ShoppingCartProduct key = {product.id}
                                                                   product = {product}
                                                                   user = {user} 
                                                                   productsToBuy = {productsToBuy}
                                                                   setProductsToBuy = {setProductsToBuy} 
                                                                   totalPriceObj = {ref} ></ShoppingCartProduct>)}

                <DisplayTotalPrice initialTotalPrice = {initialTotalPrice} ref = {ref} />

                <Button onClick = {handleClick}>Order</Button>
            </div>
        </StyledCheckout>
    );
};

export default Checkout;
