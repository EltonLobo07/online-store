import PropTypes from "prop-types";
import styled from "styled-components";
import OrderProduct from "./OrderProduct";

const StyledOrder = styled.div`
    border: 1px solid;
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    .table-container table, .table-container th, .table-container td {
        border: 1px solid;
    }

    .table-container table {
        border-collapse: collapse;
        text-align: center;
    }

    .table-container {
        display: flex;
        justify-content: center;
    }
`;

function calcTotalPrice(products) {
    return products.reduce((prevVal, curObj) => prevVal + curObj.product.price * curObj.quantity, 0);
}

function Order({ order, orderNum }) {
    const dateObj = new Date(order.date);

    return (
        <StyledOrder>
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
        </StyledOrder>
    );
};

Order.propTypes = {
    order: PropTypes.object.isRequired,
    orderNum: PropTypes.number.isRequired
};

export default Order;
