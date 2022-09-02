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
        return <div className = "flex-grow bg-gray-50"></div>;

    if (orders.length === 0) // User is logged in
        return (
            <div className = "flex-grow bg-gray-50">
                <div className = "font-medium text-xl text-purple-700 text-center pt-10">
                    No orders
                </div>
            </div>  
        );

    return (
        <div className = "flex-grow bg-gray-50 flex flex-col">
            <div className = "font-medium text-xl text-purple-700 text-center pt-10">
                Your orders
            </div>

            <div className = "flex flex-col items-stretch gap-y-5 p-5 md:px-16 w-3/4 min-w-[300px] max-w-screen-lg mx-auto my-5">
                {orders.map((order, orderNum) => <Order key = {order.id} order = {order} orderNum = {orderNum} />).reverse()}
            </div>
        </div>
    );
};

export default Orders;
