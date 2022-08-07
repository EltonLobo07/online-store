import styled from "styled-components";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect, createRef } from "react";
import userService from "../services/users";
import ShoppingCartItem from "./ShoppingCartItem";
import DisplayTotalPrice from "./DisplayTotalPrice";
import Button from "./Button";
import orderService from "../services/orders";

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

    > div > button {
        width: 50px;
        height: 50px;
    }
`;

function Checkout() {
    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [refs, setRefs] = useState([]);
    const [user, setUser] = useOutletContext();
    const navigate = useNavigate();

    async function handleClick() {
        const curOrder = [];
        
        for (let i= 0; i < items.length; i++)
        {
            curOrder.push({item: items[i].id, quantity: Number(refs[items[i].id].current.value)});
            if (curOrder[curOrder.length - 1].quantity === 0)
            {
                alert("Get rid of the item whose background color is red or increase the quantity amount by 1");
                return;
            }
        }

        try {
            await orderService.order(user.token, user.id, curOrder);
            // The above request will place an order and clear shoppingCartItems of the user
            alert("Order received");
            const userCopy = {...user, shoppingCartItems: []};
            window.localStorage.setItem("user", JSON.stringify(userCopy));
            setUser(userCopy);
        }
        catch(err) {
            alert(err?.response?.data?.error || err.message);
        }

        console.log(curOrder);
    };

    useEffect(() => {
        if (user)
        {
            console.log("Code inside useEffect executed");
            userService.getShoppingCartItems(user.id, user.token)
                       .then(checkoutItems => {
                            let totalAcc = 0, initialRefs = [];

                            for (let i = 0; i < checkoutItems.length; i++)
                            {
                                initialRefs[checkoutItems[i].id] = createRef();
                                totalAcc += checkoutItems[i].price;
                            }

                            if (totalPrice === 0)
                                setTotalPrice(Math.max(totalAcc.toFixed(2), 0));

                            setItems(checkoutItems);
                            setRefs(initialRefs);
                        })
                       .catch(err => alert(err?.response?.data?.error || err.message));
        }
        else if (user === undefined)
            navigate("/login", {replace: true});
    }, [user]);

    if (user === undefined) // User is not logged in
        return null;

    if (user === null || user.shoppingCartItems.length === 0) // User is logged in
        return (
            <StyledCheckout>
                <div>No items in the cart</div>
            </StyledCheckout>
        );

    return (
        <StyledCheckout>
            <div>
                {items.map((item, i) => <ShoppingCartItem key = {item.id}
                                                          item = {item}
                                                          user = {user} 
                                                          setUser = {setUser}
                                                          totalPrice = {totalPrice}
                                                          setTotalPrice = {setTotalPrice} 
                                                          ref = {refs[items[i].id]}></ShoppingCartItem>)}

                <DisplayTotalPrice totalPrice = {totalPrice} />

                <Button onClick = {handleClick}>Order</Button>
            </div>
        </StyledCheckout>
    );
};

export default Checkout;
