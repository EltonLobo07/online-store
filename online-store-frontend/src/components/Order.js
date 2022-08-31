import React from "react";
import PropTypes from "prop-types";
import OrderProduct from "./OrderProduct";

function calcTotalPrice(products) {
    return products.reduce((prevVal, curObj) => prevVal + curObj.product.price * curObj.quantity, 0);
}

function Order({ order, orderNum }) {
    const dateObj = new Date(order.date);

    return (
        <div className = "flex flex-col gap-y-2 rounded-lg shadow-lg shadow-gray-400 p-4 bg-white">
            <div className = "p-4 rounded-lg flex flex-col gap-y-2 items-center">
                <div className = "font-medium text-lg">
                    Id:
                    <span className = "text-purple-700">
                        {" "}{order.id}
                    </span>
                </div>

                <table className = "border-t border-r border-l border-black">
                    <caption>Products purchased</caption>

                    <thead className = "border-b border-black">
                        <tr>
                            <th className = "text-center p-2">Product</th>
                            <th className = "text-center p-2">Quantity</th>
                            <th className = "text-center p-2">Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {order.products.map(product => <OrderProduct key = {product.product.id + orderNum} product = {product} />)}
                    </tbody>
                </table>
            </div>      

            <div>
                <span className = "font-medium text-lg">Date:</span> {dateObj.toDateString()}
            </div>

            <div>
                <span className = "font-medium text-lg">Time:</span> {dateObj.toTimeString()}
            </div>

            <div>
                <span className = "font-medium text-lg">Address:</span> {order.address}
            </div>

            <div className = "self-end font-medium text-lg">
                Total:
                <span className = "text-purple-700">
                    {" $"}{calcTotalPrice(order.products).toFixed(2)}
                </span>
            </div>
        </div>
    );
};

Order.propTypes = {
    order: PropTypes.object.isRequired,
    orderNum: PropTypes.number.isRequired
};

export default Order;
