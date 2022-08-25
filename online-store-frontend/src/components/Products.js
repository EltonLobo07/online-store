import React, { useState, useEffect } from "react";
import Product from "./Product";
import { useOutletContext } from "react-router-dom";
import productService from "../services/products";
import userService from "../services/users";
import categoryService from "../services/categories";

function myFilter(products, category, keywordSearch, minPrice, maxPrice) {
    const lCSearchKeyword = keywordSearch.toLowerCase();
    return products.filter(product => {
        let res = true;

        const curProductCategoryName = product.category.name;

        if (category !== INITIAL_CUR_CATEGORY_STATE && curProductCategoryName !== category)
            res = false;

        if (res && !product.title.toLowerCase().includes(lCSearchKeyword))
            res = false;

        if (res && (product.price < minPrice || product.price > maxPrice))
            res = false;

        return res;
    });
};

function mySort(products, sortByPrice) {
    if (sortByPrice === INITIAL_SORT_BY_PRICE_STATE)
        return;

    let neg = 1;

    if (sortByPrice === "decreasing")
        neg = -1;

    products.sort((p1, p2) => {
        if (p1.price < p2.price)
            return -1 * neg;
        
        if (p1.price > p2.price)
            return 1 * neg;

        return 0;
    });
};

const INITIAL_SORT_BY_PRICE_STATE = "order doesn't matter";
const INITIAL_CUR_CATEGORY_STATE = "all";

function Products() {
    const [products, setProducts] = useState([]);
    const [user] = useOutletContext();
    const [productsInTheCart, setProductsInTheCart] = useState({});

    const [curCategory, setCurCategory] = useState(INITIAL_CUR_CATEGORY_STATE);
    const [categories, setCategories] = useState([]);
    const [sortByPrice, setSortByPrice] = useState(INITIAL_SORT_BY_PRICE_STATE);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    function handleCategoryChange(e) {
        setCurCategory(e.target.value);
    };

    function handleSortByPriceChange(e) {
        setSortByPrice(e.target.value);
    };

    function handleSearchKeywordChange(e) {
        setSearchKeyword(e.target.value);
    };

    function handleMinPriceChange(e) {
        const currentValue = Number(e.target.value);
        setMinPrice(isNaN(currentValue) ? "" : currentValue);
    };

    function handleMaxPriceChange(e) {
        const currentValue = Number(e.target.value);
        setMaxPrice(isNaN(currentValue) ? "" : currentValue);
    };

    useEffect(() => {
        productService.getAllProducts()
                      .then(products => {
                        setMaxPrice(Math.ceil(products.reduce((prev, product) => Math.max(prev, product.price), 0)));
                        setProducts(products);
                      })
                      .catch(err => alert(err?.response?.data?.error || err.message));

        if (user)
        {
            userService.getShoppingCartProducts(user.id, user.token)
                       .then(shoppingCartProducts => setProductsInTheCart(shoppingCartProducts))
                       .catch(err => alert(err?.response?.data?.error || err.message));
        }

        categoryService.getAllCategories()
                       .then(returnedCategories => setCategories(returnedCategories))
                       .catch(err => alert(err?.response?.data?.error || err.message));
    }, [user]);

    let filteredProducts = myFilter(products, curCategory, searchKeyword, minPrice, maxPrice);
    mySort(filteredProducts, sortByPrice); // In-place sorting 

    return (
        <div className = "flex-grow">
            <div>
                <div>
                    {`Number of products in the cart: ${Object.keys(productsInTheCart).length}`}
                </div>

                <div>
                    <label htmlFor = "keywordSearch">keyword search: </label>
                    <input type = "text" value = {searchKeyword} onChange = {handleSearchKeywordChange} />

                    <label htmlFor = "sortByPrice">Sort by price: </label>
                    <select id = "sortByPrice" onChange = {handleSortByPriceChange} >
                        <option value = {INITIAL_SORT_BY_PRICE_STATE}>{INITIAL_SORT_BY_PRICE_STATE}</option>
                        <option value = "increasing">increasing</option>
                        <option value = "decreasing">decreasing</option>
                    </select>

                    <label htmlFor = "category">Category: </label>
                    <select id = "category" onChange = {handleCategoryChange}>
                        <option value = {INITIAL_CUR_CATEGORY_STATE}>{INITIAL_CUR_CATEGORY_STATE}</option>
                        {categories.map(category => <option key = {category.id} value = {category.name}>{category.name}</option>)}
                    </select>

                    <br />
                    <br />

                    <label htmlFor="minPrice">Minimum price: </label>
                    <input type="text" id = "minPrice" value = {minPrice} onChange = {handleMinPriceChange} />
                    
                    <label htmlFor="maxPrice">Maximum price: </label>
                    <input type="text" id = "maxPrice" value = {maxPrice} onChange = {handleMaxPriceChange} />
                </div>
            </div>

            {filteredProducts.map(product => <Product key = {product.id} 
                                                        product = {product}
                                                        user = {user}
                                                        productsInTheCart = {productsInTheCart}
                                                        setProductsInTheCart = {setProductsInTheCart} />)}
        </div>
    );
};

export default Products;
