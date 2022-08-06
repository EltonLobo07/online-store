import styled from "styled-components";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import userService from "../services/users";
import ShoppingCartItem from "./ShoppingCartItem";

const StyledCheckout = styled.div`
    // To center the header on viewport with large width 
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
`;

function Checkout() {
    const [items, setItems] = useState([]);
    const [user, setUser] = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user)
        {
            function addQuantityFieldInPlace(item) {
                item.quantity = 1;
                return item;
            }

            userService.getShoppingCartItems(user.id, user.token)
                       .then(items => items.map(item => addQuantityFieldInPlace(item)))
                       .then(checkoutItems => setItems(checkoutItems))
                       .catch(err => alert(err?.response?.data?.error || err.message));
        }
    }, [user]);

    if (user === undefined)
    {
        navigate("/login", {replace: true});
        return null;
    }

    if (user === null || user.shoppingCartItems.length === 0)
        return (
            <StyledCheckout>
                <div>No items in the cart</div>
            </StyledCheckout>
        );

    return (
        <StyledCheckout>
            <div>
                {items.map(item => <ShoppingCartItem key = {item.id} item = {item} user = {user} setUser = {setUser}></ShoppingCartItem>)}
            </div>
        </StyledCheckout>
    );
};

export default Checkout;
