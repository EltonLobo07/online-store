import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<App />}>
                <Route path = "" element = {<Home />}></Route>
                <Route path = "products" element = {<Products />}></Route>
                <Route path = "checkout" element = {<Checkout />}></Route>
            </Route>
            <Route path = "login" element = {<LogIn />}></Route>
            <Route path = "signup" element = {<SignUp />}></Route>
        </Routes>
    </BrowserRouter>
);
