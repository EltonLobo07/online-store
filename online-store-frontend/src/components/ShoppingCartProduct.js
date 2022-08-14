import styled from "styled-components";
import Button from "./Button";
import PropTypes from "prop-types";
import userService from "../services/users";
import React, { useEffect, useState } from "react";

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

function toggleInputAndFocus(e) {
    e.target.disabled = !e.target.disabled;
    e.target.focus();
};

function ShoppingCartProduct({ product, user, productsToBuy, setProductsToBuy, totalPriceObj}) {
    const [quantity, setQuantity] = useState(1);

    async function handleClick() {
        const responseStatus = await userService.removeShoppingCartProduct(product.id, user.id, user.token);

        if (responseStatus === 204)
        {
            setProductsToBuy(productsToBuy.filter(curProduct => curProduct.id !== product.id));
            totalPriceObj.current.setTotalPrice(totalPriceObj.current.totalPrice -  quantity * product.price);
        }
    };

    async function handleQuantityChange(e) {
        const enteredQuantity = Math.max(Number(e.target.value), 0);

        try {
                toggleInputAndFocus(e);
                const returnedQuantity = await userService.updateShoppingCartProduct(user.token, user.id, product.id, enteredQuantity);
                totalPriceObj.current.setTotalPrice(totalPriceObj.current.totalPrice + (returnedQuantity - quantity) * product.price);
                setQuantity(returnedQuantity);
                toggleInputAndFocus(e);
        }
        catch (err) {
            alert(err?.response?.data?.error || err.message);
        }
    };

    useEffect(() => {
        userService.getShoppingCartProductQuantity(user.token, user.id, product.id)
                   .then(returnedQuantity => {
                    totalPriceObj.current.setTotalPrice(totalPriceObj.current.totalPrice + (returnedQuantity - quantity) * product.price);
                    setQuantity(returnedQuantity);
                   })
                   .catch(err => alert(err?.response?.data?.error || err.message));
    }, []);

    return (
        <StyledShoppingCartItem quantity = {quantity}>
            <div>Title: <span>{product.title}</span></div>
            <label htmlFor = "quantity">Quantity: </label>
            <input type = "number" id = "quantity" value = {String(quantity)} onChange = {handleQuantityChange} />
            <div>Price: $({quantity} x {product.price}) = <span>${(quantity * product.price).toFixed(2)}</span></div>
            <br />
            <Button onClick = {handleClick}>delete</Button>
        </StyledShoppingCartItem>
    );
};

ShoppingCartProduct.propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object,
    productsToBuy: PropTypes.array.isRequired,
    setProductsToBuy: PropTypes.func.isRequired,
    totalPriceObj: PropTypes.object.isRequired
};

export default ShoppingCartProduct;
