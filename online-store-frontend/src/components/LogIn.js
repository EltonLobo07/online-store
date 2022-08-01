import LabelAndInputContainer from "./LabelAndInputContainer";
import Button from "./Button";
import FormContainer from "./FormContainer";
import { useState } from "react";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        // Code here

        console.log(email, password);

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