import styled from "styled-components";
import Button from "./Button";
import PropTypes from "prop-types";
import userService from "../services/users";
import React, { useState } from "react";

const StyledShoppingCartItem = styled.div`
    font-size: 1.2rem;
    padding: 10px;
    width: minmax(300, 500);
    background-color: ${props => props.quantity ? "lightgreen" : "#f78279"};

    > input {
        width: 50px;
    }

    span {
        font-weight: 700;
    }
`;

const ShoppingCartItem = React.forwardRef(({ item, user, setUser, totalPrice, setTotalPrice}, ref) => {
    const [quantity, setQuantity] = useState(1);

    async function handleClick() {
        const responseStatus = await userService.removeShoppingCartItem(item.id, user.id, user.token);

        if (responseStatus === 204)
        {
            const userCopy = {token: user.token, id: user.id, shoppingCartItems: [...user.shoppingCartItems]};
            userCopy.shoppingCartItems = userCopy.shoppingCartItems.filter(itemId => itemId !== item.id);
            window.localStorage.setItem("user", JSON.stringify(userCopy));
            setUser(userCopy);
            setTotalPrice(Math.max((totalPrice - quantity * item.price).toFixed(2), 0));
        }
    };

    function handleQuantityChange(e) {
        const enteredQuantity = Math.max(Number(e.target.value), 0);
        setTotalPrice(Math.max((totalPrice + (enteredQuantity - quantity) * item.price).toFixed(2), 0));
        setQuantity(enteredQuantity);
    };

    return (
        <StyledShoppingCartItem quantity = {quantity}>
            <div>Title: <span>{item.title}</span></div>
            <label htmlFor = "quantity">Quantity: </label>
            <input type = "number" id = "quantity" value = {String(quantity)} onChange = {handleQuantityChange} ref = {ref} />
            <div>Price: $({quantity} x {item.price}) = <span>${(quantity * item.price).toFixed(2)}</span></div>
            <br />
            <Button onClick = {handleClick}>delete</Button>
        </StyledShoppingCartItem>
    );
});

ShoppingCartItem.propTypes = {
    item: PropTypes.object.isRequired,
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired,
    totalPrice: PropTypes.number.isRequired,
    setTotalPrice: PropTypes.func.isRequired
};

export default ShoppingCartItem;
