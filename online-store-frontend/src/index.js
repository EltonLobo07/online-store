import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Products from "./components/products/Products";
import Checkout from "./components/checkout/Checkout";
import Home from "./components/home/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<App />}>
                <Route path = "" element = {<Home />}></Route>
                <Route path = "products" element = {<Products />}></Route>
                <Route path = "checkout" element = {<Checkout />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
);
