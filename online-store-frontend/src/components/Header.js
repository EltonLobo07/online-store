import styled from "styled-components";
import Menu from "./Menu";

const horizontalPadding = "20px";
const gridChildMinWidth = "280px";

const StyledHeader = styled.div`
    background-color: black;

    // To center the header on viewport with large width
    display: flex;
    justify-content: center;

    // Usually contains 2 divs, 1 div for header logo or company info and the other for menu 
    > div {
        width: min(100%, 1000px);

        padding: 32px ${horizontalPadding};
        display: grid;
        grid-template: 1fr / repeat(auto-fit, minmax(${gridChildMinWidth}, 1fr));
        row-gap: 32px;

        color: white; 
    }

    // The header logo or company info section should look a bit bigger than menu items
    > div > div:first-child {
        font-size: 24px;

        // Changing font-size displaced the text from center
        display: flex;
        align-items: center;
    }

    // When only the header logo or company info is present in the 1st row, center the text
    @media (max-width: calc(2 * ${horizontalPadding} + 2 * ${gridChildMinWidth} - 1px))
    {
        > div > div:first-child {
            justify-content: center;
        }
    } 
`;

function Header() {
    return (
        <StyledHeader>
            <div>
                <div>Fake Store</div>
                <Menu />
            </div>
        </StyledHeader>
    );
};

export default Header;