import styled from "styled-components";

const CenterChildren = styled.div`
    background-color: var(--my-gray);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${props => props.flexDirection};
    ${props => {
        if (props.flexDirection === "column" && props.rowGap)
            return `row-gap: ${props.rowGap};`;

        if (props.flexDirection === "row" && props.columnGap)
            return `column-gap: ${props.columnGap};`;
    }}
`;

export default CenterChildren;
