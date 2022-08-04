import LabelAndInputContainer from "./LabelAndInputContainer";
import Button from "./Button";
import FormContainer from "./FormContainer";
import { useState } from "react";
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
            <form onSubmit = {handleSubmit}>
                <FormContainer>
                    <LabelAndInputContainer>
                        <label htmlFor = "email">Email:</label>
                        <input  type = "email" 
                                id = "email" 
                                placeholder = "elton@example.com"
                                value = {email}
                                onChange = {e => setEmail(e.target.value)} />
                    </LabelAndInputContainer>

                    <LabelAndInputContainer>
                        <label htmlFor = "password">Password:</label>
                        <input  type = "password" 
                                id = "password" 
                                placeholder = "Enter your password here"
                                value = {password}
                                onChange = {e => setPassword(e.target.value)} />
                    </LabelAndInputContainer>

                    <Button>Submit</Button>
                </FormContainer>
            </form>
    );
};

export default LogIn;