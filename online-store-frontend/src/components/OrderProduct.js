import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function OrderProduct({ product }) {
    const navigate = useNavigate();

    return (
        <tr onClick = {() => navigate(`/products/${product.product.id}`)} className = "hover:bg-gray-50 cursor-pointer border-b border-black">
            <td className = " p-2 text-center line-clamp-3">
                {product.product.title}
            </td>

            <td className = " p-2 text-center text-purple-700 font-medium">
                {product.quantity}
            </td>

            <td className = " p-2 text-center text-purple-700 font-medium">
                ${product.product.price}
            </td>
        </tr>
    );
};

OrderProduct.propTypes = {
    product: PropTypes.object.isRequired
};

export default OrderProduct;
