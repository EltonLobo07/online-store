import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/users";

import CenterChildren from "./styled-components/CenterChildren";
import FlexForm from "./styled-components/FlexForm";
import Input from "./styled-components/Input";
import TextArea from "./styled-components/TextArea";

import { ReactComponent as EmailIcon } from "../images/svgs/mail-icon.svg";
import { ReactComponent as NameIcon } from "../images/svgs/name-icon.svg";
import { ReactComponent as PasswordIcon } from "../images/svgs/password-icon.svg";
import { ReactComponent as AddressIcon } from "../images/svgs/address-icon.svg";

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
        <CenterChildren flexDirection = "column" rowGap = "32px">
            <h1 style = {{
                    color: "var(--my-blue)"
            }}>
                Sign Up
            </h1>

            <FlexForm onSubmit = {handleSubmit}
                      padding = "32px"
                      rowGap = "12px">

                <Input elementId = "name"
                       Icon = {NameIcon}
                       type = "text"
                       placeholder = "Full name*"
                       value = {Name}
                       onChange = {e => setName(e.target.value)}
                />

                <Input elementId = "email"
                       Icon = {EmailIcon}
                       type = "text"
                       placeholder = "Email address*"
                       value = {email}
                       onChange = {e => setEmail(e.target.value)}
                />

                <Input elementId = "password"
                       Icon = {PasswordIcon}
                       type = "password"
                       placeholder = "Password*"
                       value = {password}
                       onChange = {e => setPassword(e.target.value)}
                />

                <TextArea elementId = "address"
                          Icon = {AddressIcon}
                          placeholder = "Address (Changable)"
                          value = {address}
                          onChange = {e => setAddress(e.target.value)}
                />

                <Button>Sign up</Button>
            </FlexForm>

            <CenterChildren flexDirection = "column" 
                            rowGap = "16px"
                            style = {{
                                justifyContent: "flex-start",
                                padding: "32px"
                            }}>
                <h2 style = {{
                    color: "var(--h2-color)",
                    fontWeight: "300"
                }}>
                    Already have an account?
                </h2>
                <Button onClick = {e => navigate("/login")}>Login</Button>
            </CenterChildren>
        </CenterChildren>
    );
};

export default SignUp;