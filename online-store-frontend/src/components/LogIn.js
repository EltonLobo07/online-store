import React, { useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import loginService from "../services/login";
import DisplayError from "./DisplayError";
import Input from "./Input";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const ref = useRef(null);
    const setUser = useOutletContext()[1];

    async function handleSubmit(e, loginDetailsObj = null) {
        e.preventDefault();

        try {
            let responseData;

            if (loginDetailsObj !== null)
                responseData = await loginService.login(loginDetailsObj);
            else
                responseData = await loginService.login({email, password});

            window.localStorage.setItem("user", JSON.stringify(responseData));
            setUser(responseData);
            navigate("/");
        }
        catch (err) {
            ref.current(err?.response?.data?.error || err.message);
        }

        setEmail("");
        setPassword("");
    };

    return (
        <div className = "bg-gray-50 flex flex-col justify-center items-center gap-y-28 py-14">
            <DisplayError ref = {ref} />

            <div className = "flex flex-col gap-y-10">
                <h1 className = "text-center text-3xl font-semibold text-purple-700">Login</h1>

                <button className = "btn w-fit self-center" onClick = {e => handleSubmit(e, {email: "guest@gmail.com", password: "guest123"})}>
                    Guest login
                </button>

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
