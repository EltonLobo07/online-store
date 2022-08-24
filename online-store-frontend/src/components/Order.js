import React from "react";
import PropTypes from "prop-types";
import OrderProduct from "./OrderProduct";

function calcTotalPrice(products) {
    return products.reduce((prevVal, curObj) => prevVal + curObj.product.price * curObj.quantity, 0);
}

function Order({ order, orderNum }) {
    const dateObj = new Date(order.date);

    return (
        <div>
            <div>Order Id: {order.id}</div>

            <div>
                <div className = "table-container">
                    <table>
                        <caption>List of products of the current order</caption>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colSpan={2}>Total price</th>
                                <td>{calcTotalPrice(order.products).toFixed(2)}</td>
                            </tr>
                        </tfoot>
                        <tbody>
                            {order.products.map(product => <OrderProduct key = {product.id + orderNum} product = {product} />)}
                        </tbody>
                    </table>
                </div>
            </div>      

            <div>Date: {dateObj.toDateString()}</div>

            <div>Time: {dateObj.toTimeString()}</div>

            <div>Address: {order.address}</div>
        </div>
    );
};

Order.propTypes = {
    order: PropTypes.object.isRequired,
    orderNum: PropTypes.number.isRequired
};

export default Order;
