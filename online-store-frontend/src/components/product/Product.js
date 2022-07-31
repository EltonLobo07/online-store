import PropTypes from "prop-types";

function Product({ product }) {
    return (
        <div style = {{border: "1px solid black"}}>
            <div>title: {product.title}</div>
            <div>price: {product.price}</div>
            <div>category: {product.category}</div>
        </div>
    );
};

Product.propTypes = {
    product: PropTypes.object.isRequired
};

export default Product;