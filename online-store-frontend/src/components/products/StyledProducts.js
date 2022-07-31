import styled from "styled-components";
import commonStylesVars from "../../common-styles-vars";

const StyledProducts = styled.div`
    // To center the header on viewport with large width 
    display: flex;
    justify-content: center;

    > div {
        width: min(100%, ${commonStylesVars.maxContentWidth});

        background-color: #f7fcfa;
        
        display: grid;
        grid-template: 1fr / repeat(auto-fit, 256px);
        justify-content: center;
        padding: 32px;
        gap: 32px;
    }
`;

export default StyledProducts;