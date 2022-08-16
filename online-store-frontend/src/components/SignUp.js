import FormContainer from "./FormContainer";
import LabelAndInputContainer from "./LabelAndInputContainer";
import Button from "./Button";
import { useState } from "react";
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
        setName("");
        setAddress("");
    };

    return (
        <form onSubmit = {handleSubmit}>
            <FormContainer>
                <LabelAndInputContainer>
                    <label htmlFor = "Name">Name*:</label>
                    <input  type = "text"
                            id = "Name" 
                            placeholder = "Elton" 
                            value = {Name}
                            onChange = {e => setName(e.target.value)} />
                </LabelAndInputContainer>

                <LabelAndInputContainer>
                    <label htmlFor = "email">Email*:</label>
                    <input  type = "email"
                            id = "email" 
                            placeholder = "elton@example.com" 
                            value = {email}
                            onChange = {e => setEmail(e.target.value)} />
                </LabelAndInputContainer>

                <LabelAndInputContainer>
                    <label htmlFor = "password">Password*:</label>
                    <input  type = "password"
                            id = "password" 
                            placeholder = "myPassword123" 
                            value = {password}
                            onChange = {e => setPassword(e.target.value)} />
                </LabelAndInputContainer>

                <LabelAndInputContainer>
                    <label htmlFor = "address">Address:</label>
                    <textarea id = "address" placeholder = "Address for order delivery" rows = "10" cols = "30" onChange = {e => setAddress(e.target.value)}></textarea>
                </LabelAndInputContainer>

                <Button>Submit</Button>
            </FormContainer>
        </form>
    );
};

export default SignUp;