import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";

import FullHeightCenteredFlexColumn from "./styled-components/FullHeightCenteredFlexColumn";
import FormFlexColumn from "./styled-components/FormFlexColumn";
import IconAndInputFlex from "./styled-components/IconAndInputFlex";
import IconContainer from "./styled-components/IconContainer";
import InputContainerFlex from "./styled-components/InputContainerFlex";
import Input from "./styled-components/Input";

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
        <FullHeightCenteredFlexColumn>
            <h1>Login</h1>

            <FormFlexColumn onSubmit = {handleSubmit} padding = "32px">
                <IconAndInputFlex>
                    <IconContainer height = "50px" padding = "8px">
                        <img src = {require("../images/mail-icon.png")} alt = "Email address icon" />
                    </IconContainer>
                    
                    <InputContainerFlex>
                        <Input  type = "email"  
                                placeholder = "Email Address*"
                                value = {email}
                                onChange = {e => setEmail(e.target.value)} />
                    </InputContainerFlex>
                </IconAndInputFlex>

                <IconAndInputFlex paddingRight = "8px">
                    <IconContainer height = "50px" padding = "8px">
                        <img src = {require("../images/padlock-icon.png")} alt = "Password icon" />
                    </IconContainer>

                    <InputContainerFlex paddingRight = "8px">
                        <Input  type = "password"  
                                placeholder = "Password*"
                                value = {password}
                                onChange = {e => setPassword(e.target.value)} />
                    </InputContainerFlex>
                </IconAndInputFlex>

                <Button>Login</Button>
            </FormFlexColumn>
        </FullHeightCenteredFlexColumn>
    );
};

export default LogIn;