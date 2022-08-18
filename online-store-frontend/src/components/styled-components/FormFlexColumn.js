import styled from "styled-components";

const FormFlexColumn = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: 16px;

    background-color: white;

    padding: ${props => props.padding};

    border-radius: 12px;
    box-shadow: 0 0 16px #7c807d;

    width: clamp(300px, 50%, 500px);
`;

export default FormFlexColumn;
