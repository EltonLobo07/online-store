import React, { useState, useEffect } from "react";
import Product from "./Product";
import { useOutletContext } from "react-router-dom";
import productService from "../services/products";
import userService from "../services/users";
import categoryService from "../services/categories";

function myFilter(products, category, keywordSearch, minPrice, maxPrice) {
    const lCSearchKeyword = keywordSearch.toLowerCase();

    return products.filter(product => {
        // Category doesn't match check
        if (category !== INITIAL_CUR_CATEGORY_STATE && product.category.name !== category)
            return false;

        // keyword doesn't match check
        if (!product.title.toLowerCase().includes(lCSearchKeyword))
            return false;

        // price boundary not respected check
        if (product.price < minPrice || product.price > maxPrice)
            return false;

        return true;
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
    const [user, _, displayErr] = useOutletContext();
    const [productsInTheCart, setProductsInTheCart] = useState(new Set()); // useState({})

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
        setMinPrice(isFinite(currentValue) ? currentValue : 0);
    };

    function handleMaxPriceChange(e) {
        const currentValue = Number(e.target.value);
        setMaxPrice(isFinite(currentValue) ? currentValue : 0);
    };

    useEffect(() => {
        const getAllProductsPromise = productService.getAllProducts();
        const getAllCategoriesPromise = categoryService.getAllCategories();

        Promise.all([getAllProductsPromise, getAllCategoriesPromise])
               .then(([ products, categories ]) => {
                    setMaxPrice(Math.ceil(products.reduce((prev, product) => Math.max(prev, product.price), 0)));
                    setProducts(products);
                    setCategories(categories);
               })
               .catch(err => displayErr(err?.response?.data?.error || err.message));
    }, []);

    useEffect(() => {
        if (user)
        {
            userService.getShoppingCartProducts(user.id, user.token)
                       .then(shoppingCartProducts => setProductsInTheCart(new Set(Object.keys(shoppingCartProducts))))
                       .catch(err => displayErr(err?.response?.data?.error || err.message));
        }
    }, [user]);

    let filteredProducts = myFilter(products, curCategory, searchKeyword, minPrice, maxPrice);
    mySort(filteredProducts, sortByPrice); // In-place sorting 

    return (
        <div className = "flex-grow flex flex-col">
            <div className = "sticky top-12 bg-purple-400 py-1 text-center text-white min-w-[300px]">
                {user ? `Hi ${user.name.length > 16 ? user.name.slice(0, 16) + "..." : user.name}, ` : null}
                {`Cart : ${productsInTheCart.size}`}
            </div>

            <div className = "flex flex-col gap-y-10 p-5 w-3/4 min-w-[300px] max-w-screen-lg mx-auto my-5 bg-gray-100 rounded-lg">
                <div className = "bg-white flex flex-col gap-y-2 py-4 items-center rounded-lg shadow-sm shadow-gray-300">
                    <div className = "flex flex-col gap-y-1">
                        <label htmlFor = "keywordSearch" className = "text-purple-700">
                            Keyword search 
                        </label>

                        <input id = "keywordSearch" type = "text" placeholder = "any keyword" value = {searchKeyword} onChange = {handleSearchKeywordChange} className = "bg-gray-100 px-2 py-1 border border-white outline-none focus:border-purple-700 rounded-sm w-40 org-sm:w-50 md:w-60" />
                    </div>
                    
                    <div className = "flex flex-col gap-y-1 org-sm:flex-row org-sm:gap-x-4">
                        <div className = "flex flex-col gap-y-1">
                            <label htmlFor = "sortByPrice" className = "text-purple-700">
                                Sort by price
                            </label>

                            <select id = "sortByPrice" onChange = {handleSortByPriceChange} className = "bg-gray-100 p-1 border border-white outline-none focus:border-purple-700 rounded-sm w-40 org-sm:w-50 md:w-60">
                                <option value = {INITIAL_SORT_BY_PRICE_STATE}>{INITIAL_SORT_BY_PRICE_STATE}</option>
                                <option value = "increasing">increasing</option>
                                <option value = "decreasing">decreasing</option>
                            </select>
                        </div>

                        <div className = "flex flex-col gap-y-1">
                            <label htmlFor = "category" className = "text-purple-700">
                                Category
                            </label>

                            <select id = "category" onChange = {handleCategoryChange} className = "bg-gray-100 p-1 border border-white outline-none focus:border-purple-700 rounded-sm w-40 org-sm:w-50 md:w-60">
                                <option value = {INITIAL_CUR_CATEGORY_STATE}>{INITIAL_CUR_CATEGORY_STATE}</option>
                                {categories.map(category => <option key = {category.id} value = {category.name}>{category.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className = "flex flex-col gap-y-1 org-sm:flex-row org-sm:gap-x-4">
                        <div className = "flex flex-col gap-y-1">
                            <label htmlFor="minPrice" className = "text-purple-700">
                                Minimum price
                            </label>

                            <input type="text" id = "minPrice" value = {minPrice} onChange = {handleMinPriceChange} className = "bg-gray-100 px-2 py-1 border border-white outline-none focus:border-purple-700 rounded-sm w-40 org-sm:w-50 md:w-60" />
                        </div>

                        <div className = "flex flex-col gap-y-1">
                            <label htmlFor="maxPrice" className = "text-purple-700">
                                Maximum price
                            </label>

                            <input type="text" id = "maxPrice" value = {maxPrice} onChange = {handleMaxPriceChange} className = "bg-gray-100 px-2 py-1 border border-white outline-none focus:border-purple-700 rounded-sm w-40 org-sm:w-50 md:w-60" />
                        </div>
                    </div>
                </div>

                {
                    filteredProducts.length == 0 ? <div className = "flex justify-center text-lg text-purple-700">No products found</div> : (
                        <div className = "grid grid-rows-[320px] auto-rows-[320px] grid-cols-[repeat(auto-fit,275px)] justify-center gap-x-4 gap-y-4"> 
                            {filteredProducts.map(product => <Product key = {product.id} 
                                                                      product = {product}
                                                                      user = {user}
                                                                      productsInTheCart = {productsInTheCart}
                                                                      setProductsInTheCart = {setProductsInTheCart}
                                                                      displayErr = {displayErr} />)}
                        </div>
                    )
                }
                
            </div>
        </div>
    );
};

export default Products;
