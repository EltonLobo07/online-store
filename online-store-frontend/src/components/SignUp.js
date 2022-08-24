import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/users";

function SignUp() {
    const [Name, setName] = useState(""); // First letter is capital for 'name' variable (intentional)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await userService.createUser({name: Name, email, password, address});
     
            alert("User created");
            navigate("/login");
        }
        catch (err) {
            alert(err?.response?.data?.error || err.message);
        }

        setEmail("");
        setPassword("");
        setName("");
        setAddress("");
    };

    return (
        <div>
            <h1>Sign Up</h1>

            <form onSubmit = {handleSubmit}>

                <div>
                    <label htmlFor = "name">Full name</label>
                    <input id = "name" type = "text" placeholder = "Full name*" value = {Name} onChange = {e => setName(e.target.value)} />
                </div>

                <div>
                    <label htmlFor = "emailAddress">Email address</label>
                    <input id = "emailAddress" type = "text" placeholder = "Email address*" value = {email} onChange = {e => setEmail(e.target.value)} />
                </div>

                <div>
                    <label htmlFor = "password">Password</label>
                    <input id = "password" type = "password" placeholder = "Password*" value = {password} onChange = {e => setPassword(e.target.value)} />
                </div>

                <div>
                    <label htmlFor = "address">Address</label>
                    <textarea id = "address" placeholder = "Address (Changable)" value = {address} onChange = {e => setAddress(e.target.value)}></textarea>
                </div>

                <button>Sign up</button>
            </form>

            <div>
                <h2>Already have an account?</h2>
                <button onClick = {e => navigate("/login")}>Login</button>
            </div>
        </div>
    );
};

export default SignUp;