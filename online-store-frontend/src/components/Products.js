import { useState, useEffect } from "react";
import Product from "./Product";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import productService from "../services/products";

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
`;

function Products() {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useOutletContext();

    useEffect(() => {
        productService.getAllProducts()
                      .then(products => setProducts(products))
                      .catch(err => console.log(err));
    }, []);

    return (
        <StyledProducts>
            <div>
                {products.map(product => <Product key = {product.id} 
                                                  product = {product}
                                                  user = {user}
                                                  setUser = {setUser} />)}
            </div>
        </StyledProducts>
    );
};

export default Products;
