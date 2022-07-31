import StyledHeader from "./StyledHeader";
import Menu from "../menu/Menu";

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