import styled from "styled-components";

const Button = styled.button`
    background-color: ${props => props.inTheCart ? "white" : "black"};
    color: ${props => props.inTheCart ? "black" : "white"};
    background-color: var(--my-blue);
    color: white;
    padding: 8px;
    border: none;

    :hover {
        background-color: var(--my-light-blue);
    }
`;

export default Button;