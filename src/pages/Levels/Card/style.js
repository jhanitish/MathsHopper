import { css, styled } from "styled-components";

const CardWrapper = styled.div`
    position: relative;
    width: 130px;
    height: 160px;
    background-color: #736a6a82;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 10px;
    border: 3px solid transparent;
    transition: transform 0.3s ease-in-out;
    ${props => !props.disabled && css`
        &:hover, &.active {
            border: 3px solid #0098a0;
            box-shadow: 0 0 5px 2px #0098a0;
        },
        &:hover {
            transform: translateY(-20px);
        }
    `}
`;

const InnerText = styled.span`
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    &.active {
        color: #0098a0;
    }
`;

export {
    CardWrapper,
    InnerText,
};