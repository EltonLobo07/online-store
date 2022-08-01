import styled from "styled-components";

const StyledFooter = styled.div`
    padding: 16px 0px;
    display: flex;
    justify-content: center;
    background-color: black;
    color: white;
`;

function Footer() {
    return <StyledFooter>Copyright © Brand name here</StyledFooter>;
};

export default Footer;
