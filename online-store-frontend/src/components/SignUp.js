import FormContainer from "./FormContainer";
import LabelAndInputContainer from "./LabelAndInputContainer";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await axios.post("/api/users", {email, password});
            alert("User created");
        }
        catch (err) {
            alert(err?.response?.data?.error || "Please try again");
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

export default SignUp;