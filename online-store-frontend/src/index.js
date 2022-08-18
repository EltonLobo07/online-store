import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import DetailedProduct from "./components/DetailedProduct";
import UnknownPath from "./components/UnknownPath";
import Orders from "./components/Orders";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<App />}>
                <Route index element = {<Home />} />
                <Route path = "/home" element = {<Home />} />

                <Route path = "products" element = {<Products />} />

                <Route path = "products/:id" element = {<DetailedProduct />} />

                <Route path = "checkout" element = {<Checkout />} />

                <Route path = "your-orders" element = {<Orders />} />
            </Route>
            
            <Route path = "login" element = {<LogIn />} />

            <Route path = "signup" element = {<SignUp />} />

            <Route path = "*" element = {<UnknownPath />} />
        </Routes>
    </BrowserRouter>
);
