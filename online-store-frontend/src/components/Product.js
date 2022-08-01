import PropTypes from "prop-types";
import StyledButton from "./Button";
import styled from "styled-components";

const StyledProduct = styled.div`
    height: 300px;

    display: flex;
    flex-direction: column;

    gap: 8px;
    padding: 8px;

    background-color: white;

    border-radius: 4px;
    border: 1px solid rgba(229, 231, 235);

    div:nth-child(2) {
        border-top: 1px solid rgba(229, 231, 235);
        padding-top: 8px;
        height: 100px;
        overflow: hidden;
    }

    > div > img {
        width: 100%;
        height: 150px;

        object-fit: contain;
    }
`;

function Product({ product }) {
    return (
        <StyledProduct>
            <div>
                <img src = {product.image} alt = {product.title} />
            </div>
            <div style = {{fontWeight: 600}}>{product.title}</div>
            <div>${product.price}</div>
            <StyledButton>Add to cart</StyledButton>
        </StyledProduct>
    );
};

Product.propTypes = {
    product: PropTypes.object.isRequired
};

export default Product;