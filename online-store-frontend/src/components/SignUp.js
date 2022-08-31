import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/users";
import DisplayError from "./DisplayError";
import Input from "./Input";

function SignUp() {
    const [Name, setName] = useState(""); // First letter is capital for 'name' variable (intentional)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const ref = useRef(null);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await userService.createUser({name: Name, email, password, address});
     
            navigate("/login");
        }
        catch (err) {
            ref.current(err?.response?.data?.error || err.message);
        }

        setEmail("");
        setPassword("");
        setName("");
        setAddress("");
    };

    return (
        <div className = "bg-gray-50 flex flex-col justify-center items-center gap-y-28 py-12">
            <DisplayError ref = {ref} />

            <div className = "flex flex-col gap-y-10">
                <h1 className = "text-center text-3xl font-semibold text-purple-700">Sign Up</h1>

                <form onSubmit = {handleSubmit} className = "border p-8 sm:p-16 flex flex-col gap-y-4 bg-white rounded-lg shadow-xl shadow-gray-300">
                    <Input inputId = "name" inputLabel = "Full name" isRequired = {true} type = "text" placeholder = "Your full name" value = {Name} onChange = {e => setName(e.target.value)} />

                    <Input inputId = "emailAddress" inputLabel = "Email" isRequired = {true} type = "text" placeholder = "Your email address" value = {email} onChange = {e => setEmail(e.target.value)} />

                    <Input inputId = "password" inputLabel = "Password" isRequired = {true} type = "password" placeholder = "Your password" value = {password} onChange = {e => setPassword(e.target.value)} />

                    <div className = "flex flex-col gap-y-1">
                        <label htmlFor = "address" className = "text-purple-700 font-medium">
                            Address
                        </label>
                        <textarea id = "address" placeholder = "Your address" value = {address} onChange = {e => setAddress(e.target.value)} rows = "5" className = "bg-gray-100 p-2 border border-white min-h-[100px] outline-none focus:border-purple-700 rounded-md w-40 sm:w-60 md:w-80"></textarea>
                    </div>

                    <button className = "btn">Sign up</button>
                </form>
            </div>

            <div className = "flex flex-col gap-y-12">
                <h2 className = "text-2xl text-gray-500">
                    Already have an account?
                </h2>
                <button onClick = {e => navigate("/login")} className = "btn">Login</button>
            </div>
        </div>
    );
};

export default SignUp;