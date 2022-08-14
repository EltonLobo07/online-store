import { useState, useEffect } from "react";
import Product from "./Product";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import productService from "../services/products";
import userService from "../services/users";

const StyledProducts = styled.div`
    // To center the header on viewport with large width 
    display: flex;
    justify-content: center;

    > div {
        width: min(100%, 1000px);

        background-color: rgba(229, 231, 235, 0.5);
        
        display: grid;
        grid-template: 1fr / repeat(auto-fit, 256px);
        justify-content: center;
        padding: 32px;
        gap: 32px;
    }

    .numProductsDisplay {
        grid-column-start: 1;
        grid-column-end: -1;
        text-align: center;
    }
`;

function Products() {
    const [products, setProducts] = useState([]);
    const [user] = useOutletContext();
    const [productsInTheCart, setProductsInTheCart] = useState({});

    useEffect(() => {
        productService.getAllProducts()
                      .then(products => setProducts(products))
                      .catch(err => console.log(err));

        if (user)
        {
            userService.getShoppingCartProducts(user.id, user.token)
                       .then(shoppingCartProducts => setProductsInTheCart(shoppingCartProducts))
                       .catch(err => alert(err?.response?.data?.error || err.message));
        }
    }, [user]);

    return (
        <StyledProducts>
            <div>
                <div className = "numProductsDisplay">
                    {`Number of products in the cart: ${Object.keys(productsInTheCart).length}`}
                </div>

                {products.map(product => <Product key = {product.id} 
                                                  product = {product}
                                                  user = {user}
                                                  productsInTheCart = {productsInTheCart}
                                                  setProductsInTheCart = {setProductsInTheCart} />)}
            </div>
        </StyledProducts>
    );
};

export default Products;
