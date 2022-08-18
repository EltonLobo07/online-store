import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import orderService from "../services/orders";
import Order from "./Order";

const StyledOrders = styled.div` 
    display: flex;
    justify-content: center;

    > div {
        width: min(100%, 1000px);

        background-color: rgba(229, 231, 235, 0.5);

        display: flex;
        flex-direction: column;
        row-gap: 16px;
        align-items: center;
        padding: 10px;
    }

    > div > div {
        width: max(300px, 50%);
    } 
`;

let navigateFunc;

function Orders() {
    const [user] = useOutletContext();
    const [orders, setOrders] = useState([]);
    
    navigateFunc = useNavigate();

    useEffect(() => {
        if (user)
        {
            orderService.getUserOrders(user.token)
                        .then(orders => setOrders(orders))
                        .catch(err => alert(err?.response?.data?.error || err.message));
        }
        else if (user === undefined)
            navigateFunc("/login", {replace: true});
    }, [user]);

    if (user === undefined) // User is not logged in
        return null;

    if (orders.length === 0) // User is logged in
        return (
            <StyledOrders>
                <div>
                    No orders
                </div>
            </StyledOrders>
        );

    return (
        <StyledOrders>
            <div>
                {orders.map((order, orderNum) => <Order key = {order.id} order = {order} orderNum = {orderNum} />)}
            </div>
        </StyledOrders>
    );
};

export default Orders;
