import styled from "styled-components";

const StyledTextAreaField = styled.textarea`
    flex-grow: 1;
    background-color: inherit;
    border: none;
    outline: none;
    line-height: 1rem;
    resize: vertical;
    min-height: 34px;
    max-height: 200px;
    padding: 8px;
`;

function TextArea({ elementId, Icon, placeholder, value, onChange }) {
    return (
        <div style = {{
                 display: "flex",
                 alignItems: "flex-start",
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

            <StyledTextAreaField id = {elementId}
                                 placeholder = {placeholder}
                                 value = {value}
                                 onChange = {onChange}
                                 rows = "7"
            />
        </div>
    )
};

export default TextArea;
