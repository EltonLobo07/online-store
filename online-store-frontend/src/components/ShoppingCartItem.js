import styled from "styled-components";
import Button from "./Button";

const StyledShoppingCartItem = styled.div`
    padding: 10px;
    width: minmax(300, 500);
    border: 1px solid black;
`;

function ShoppingCartItem({ item }) {
    function handleClick() {
        // Do something
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

export default ShoppingCartItem;
