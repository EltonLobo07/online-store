import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";

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
        <div>
            <h1>Login</h1>

            <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor = "email">Email</label>
                    <input id = "email" type = "text" placeholder = "Email address*" value = {email} onChange = {e => setEmail(e.target.value)} />
                </div>

                <div>
                    <label htmlFor = "password">Password</label>
                    <input id = "password" type = "password" placeholder = "Password*" value = {password} onChange = {e => setPassword(e.target.value)} />
                </div>

                <button>Login</button>
            </form>

            <div>
                <h2>
                    Haven't signed up yet?
                </h2>
                <button onClick = {e => navigate("/signup")}>Create new account</button>
            </div>
        </div>
    );
};

export default LogIn;