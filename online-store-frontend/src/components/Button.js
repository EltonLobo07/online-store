import styled from "styled-components";

const Button = styled.button`
    background-color: ${props => props.inTheCart ? "white" : "black"};
    color: ${props => props.inTheCart ? "black" : "white"};
    padding: 8px;
    border: 1px solid black;
`;

export default Button;