import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";

import CenterChildren from "./styled-components/CenterChildren";
import FlexForm from "./styled-components/FlexForm";
import Input from "./styled-components/Input";

import { ReactComponent as EmailIcon} from "../images/svgs/mail-icon.svg";
import { ReactComponent as PasswordIcon } from "../images/svgs/password-icon.svg";

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
        <CenterChildren flexDirection = "column"
                        rowGap = "32px"
                        style = {{
                            height: "100%"
                        }}>
            <h1 style = {{
                    color: "var(--my-blue)"
            }}>
                Login
            </h1>

            <FlexForm onSubmit = {handleSubmit}
                      padding = "32px"
                      rowGap = "12px">
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

                <Button>Login</Button>
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
                    Haven't signed up yet?
                </h2>
                <Button onClick = {e => navigate("/signup")}>Create new account</Button>
            </CenterChildren>
        </CenterChildren>
    );
};

export default LogIn;