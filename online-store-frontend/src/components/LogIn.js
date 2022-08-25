import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";
import Input from "./Input";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const responseData = await loginService.login({email, password});
            window.localStorage.setItem("user", JSON.stringify(responseData));
            navigate("/");
        }
        catch (err) {
            alert(err?.response?.data?.error || err.message);
        }

        setEmail("");
        setPassword("");
    };

    return (
        <div className = "bg-gray-50 flex flex-col justify-center items-center gap-y-28 py-12">
            <div className = "flex flex-col gap-y-10">
                <h1 className = "text-center text-3xl font-semibold text-purple-700">Login</h1>

                <form onSubmit = {handleSubmit} className = "border p-8 sm:p-16 flex flex-col gap-y-4 bg-white rounded-lg shadow-xl shadow-gray-300">

                    <Input inputId = "email" inputLabel = "Email" isRequired = {true} type = "text" placeholder = "Your email address" value = {email} onChange = {e => setEmail(e.target.value)} />

                    <Input inputId = "password" inputLabel = "Password" isRequired = {true} type = "password" placeholder = "Your password" value = {password} onChange = {e => setPassword(e.target.value)} />

                    <button className = "btn">Login</button>
                </form>
            </div>

            <div className = "flex flex-col gap-y-12">
                <h2 className = "text-2xl text-gray-500">
                    Haven't signed up yet?
                </h2>
                <button onClick = {e => navigate("/signup")} className = "btn">Create new account</button>
            </div>
        </div>
    );
};

export default LogIn;
