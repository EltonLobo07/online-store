import React from "react";
import PropTypes from "prop-types";

function OrderProduct({ product }) {
    return (
        <tr>
            <td>{product.product.title}</td>
            <td>{product.quantity}</td>
            <td>{product.product.price}</td>
        </tr>
    );
};

OrderProduct.propTypes = {
    product: PropTypes.object.isRequired
};

export default OrderProduct;
