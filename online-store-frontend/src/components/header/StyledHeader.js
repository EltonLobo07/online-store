import styled from "styled-components";

const horizontalPadding = "20px";
const gridChildMinWidth = "280px";

const StyledHeader = styled.div`
    padding: 32px ${horizontalPadding};
    display: grid;
    grid-template: 1fr / repeat(auto-fit, minmax(${gridChildMinWidth}, 1fr));
    row-gap: 32px;

    > div:first-child {
        font-size: 24px;
        display: flex;
        align-items: center;
    }

    @media (max-width: calc(2 * ${horizontalPadding} + 2 * ${gridChildMinWidth} - 1px))
    {
        > div:first-child {
            justify-content: center;
        }
    } 
`;

export default StyledHeader;
