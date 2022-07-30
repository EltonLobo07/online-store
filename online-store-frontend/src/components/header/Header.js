import StyledHeader from "./StyledHeader";
import Menu from "../menu/Menu";

function Header() {
    return (
        <StyledHeader>
            <div>Fake Store</div>
            <Menu />
        </StyledHeader>
    );
};

export default Header;