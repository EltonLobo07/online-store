import FormContainer from "./FormContainer";
import LabelAndInputContainer from "./LabelAndInputContainer";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/users";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await userService.createUser({email, password});

            // Why use "await" keyword here? Maybe read the below stackoverflow question and answers
            // https://stackoverflow.com/questions/56895695/why-do-i-need-to-await-an-async-function-when-it-is-not-supposedly-returning-a-p#:~:text=Async%2Fawait%20does%20not%20do,how%20the%20async%20function%20works.
            
            alert("User created");
            navigate("/login");
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

export default SignUp;