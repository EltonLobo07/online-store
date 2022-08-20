import styled from "styled-components";

const StyledInputField = styled.input`
    flex-grow: 1;
    background-color: inherit;
    border: none;
    outline: none;
    line-height: 1rem;
`;

function Input({ elementId, Icon, type, placeholder, value, onChange }) {
    return (
        <div style = {{
                 display: "flex",
                 alignItems: "center",
                 padding: "8px",
                 columnGap: "8px",
                 flexGrow: "1",
                 backgroundColor: "var(--my-gray)"
        }}>
            <label htmlFor = {elementId} 
                   style = {{
                       width: "34px",
                       height: "34px",
                       backgroundColor: "inherit"
            }}>
                <Icon style = {{
                          width: "100%",
                          height: "100%"       
                }}/>
            </label>

            <StyledInputField id = {elementId}
                              type = {type}
                              placeholder = {placeholder}
                              value = {value}
                              onChange = {onChange}
            />
        </div>
    )
};

export default Input;
