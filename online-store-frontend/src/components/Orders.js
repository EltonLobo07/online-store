import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import orderService from "../services/orders";
import Order from "./Order";

let navigateFunc;

function Orders() {
    const [user, _, displayErr] = useOutletContext();
    const [orders, setOrders] = useState([]);
    
    navigateFunc = useNavigate();

    useEffect(() => {
        if (user)
        {
            orderService.getUserOrders(user.token)
                        .then(orders => setOrders(orders))
                        .catch(err => displayErr(err?.response?.data?.error || err.message));
        }
        else if (user === undefined)
            navigateFunc("/login", {replace: true});
    }, [user]);

    if (user === undefined) // User is not logged in
        return <div className = "flex-grow"></div>;

    if (orders.length === 0) // User is logged in
        return (
            <div className = "flex-grow">
                <div>
                    No orders
                </div>
            </div>
        );

    return (
        <div className = "flex-grow">
            <div>
                {orders.map((order, orderNum) => <Order key = {order.id} order = {order} orderNum = {orderNum} />)}
            </div>
        </div>
    );
};

export default Orders;
