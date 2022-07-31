import { useState, useEffect } from "react";
import axios from "axios";
import Product from "../product/Product";
import StyledProducts from "./StyledProducts";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
             .then(response => setProducts(response.data))
             .catch(err => console.log(err));
    }, []);

    return (
        <StyledProducts>
            <div>
                {products.map(product => <Product key = {product.id} product = {product} />)}
            </div>
        </StyledProducts>
    );
};

export default Products;
