import styled from "styled-components";
import Button from "./Button";
import PropTypes from "prop-types";
import userService from "../services/users";

const StyledShoppingCartItem = styled.div`
    padding: 10px;
    width: minmax(300, 500);
    border: 1px solid black;
`;

function ShoppingCartItem({ item, user, setUser }) {
    async function handleClick() {
        const responseStatus = await userService.removeShoppingCartItem(item.id, user.id, user.token);

        if (responseStatus === 204)
        {
            const userCopy = {token: user.token, id: user.id, shoppingCartItems: [...user.shoppingCartItems]};
            userCopy.shoppingCartItems = userCopy.shoppingCartItems.filter(itemId => itemId !== item.id);
            window.localStorage.setItem("user", JSON.stringify(userCopy));
            setUser(userCopy);
        }
    };

    return (
        <StyledShoppingCartItem>
            <div>{item.title}</div>
            <div>{item.price}</div>
            <div>{item.quantity}</div>
            <Button onClick = {handleClick}>delete</Button>
        </StyledShoppingCartItem>
    );
};

ShoppingCartItem.propTypes = {
    item: PropTypes.object.isRequired,
    user: PropTypes.object,
    setUser: PropTypes.func.isRequired
};

export default ShoppingCartItem;
