import styled from "styled-components";

const IconContainer = styled.div`
    height: ${props => props.height};
    padding: ${props => props.padding};

    > img {
        width: 100%;
        height: 100%;
    }
`

export default IconContainer;
