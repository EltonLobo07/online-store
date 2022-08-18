import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/users";

import FullHeightCenteredFlex from "./styled-components/FullHeightCenteredFlexColumn";
import FormFlexColumn from "./styled-components/FormFlexColumn";
import IconAndInputFlex from "./styled-components/IconAndInputFlex";
import IconContainer from "./styled-components/IconContainer";
import InputContainerFlex from "./styled-components/InputContainerFlex";
import Input from "./styled-components/Input";

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
        <FullHeightCenteredFlex>
            <h1>Sign Up</h1>

            <FormFlexColumn onSubmit = {handleSubmit} padding = "32px">
                <IconAndInputFlex>
                    <IconContainer height = "50px" padding = "8px">
                        <img src = {require("../images/name-icon.png")} alt = "Name icon" />
                    </IconContainer>

                    <InputContainerFlex paddingRight = "8px">
                        <Input  type = "text"
                                id = "Name" 
                                placeholder = "Full name*" 
                                value = {Name}
                                onChange = {e => setName(e.target.value)} />
                    </InputContainerFlex>
                </IconAndInputFlex>

                <IconAndInputFlex>
                    <IconContainer height = "50px" padding = "8px">
                        <img src = {require("../images/mail-icon.png")} alt = "Email address icon" />
                    </IconContainer>

                    <InputContainerFlex paddingRight = "8px">
                        <Input  type = "email"
                                id = "email" 
                                placeholder = "Email Address*" 
                                value = {email}
                                onChange = {e => setEmail(e.target.value)} />
                    </InputContainerFlex>
                </IconAndInputFlex>

                <IconAndInputFlex>
                    <IconContainer height = "50px" padding = "8px">
                        <img src = {require("../images/padlock-icon.png")} alt = "Password icon" />
                    </IconContainer>

                    <InputContainerFlex paddingRight = "8px">
                        <Input  type = "password"
                                id = "password" 
                                placeholder = "Password*" 
                                value = {password}
                                onChange = {e => setPassword(e.target.value)} />
                    </InputContainerFlex>
                </IconAndInputFlex>

                <IconAndInputFlex>
                    <IconContainer height = "50px" padding = "8px">
                        <img src = {require("../images/address-icon.png")} alt = "Address icon" />
                    </IconContainer>

                    <div style = {{
                        padding: "16px 0",
                        display: "flex",
                        flexGrow: "1",
                        paddingRight: "8px"
                    }}>
                        <textarea id = "address" placeholder = "Address (Changable)" 
                                  rows = "5" onChange = {e => setAddress(e.target.value)}
                                  style = {{flexGrow: "1",
                                    resize: "vertical",
                                    backgroundColor: "rgb(240, 240, 240)",
                                    border: "none",
                                    outline: "none"
                                  }}></textarea>
                    </div>
                </IconAndInputFlex>

                <Button>Sign up</Button>
            </FormFlexColumn>
        </FullHeightCenteredFlex>
    );
};

export default SignUp;