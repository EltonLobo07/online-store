import styled from "styled-components";

const FlexForm = styled.form`
    display: flex;
    flex-direction: column;
    row-gap: ${props => props.rowGap};
    padding: ${props => props.padding};
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 0 32px #a5a7ab;
    width: clamp(300px, 50%, 450px);
`;

export default FlexForm;
