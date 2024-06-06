import styled from "styled-components";

const ModalWrapper = styled.div`
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 450px;
    height: 600px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    flex-direction: column;
    align-items: center;
    z-index: 9999;
`;
const SubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
`;

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 480px;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 10px;
`;

const FooterWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const TextContainer = styled.div`
    font-size: ${props => props.size ? props.size : 26}px;
`;

const Button = styled.button`
    width: 80px;
    padding: 10px;
    background: #46852c;
    border: 4px solid #f2f4f142;
    border-radius: 2px;
    color: #fff;
    box-shadow: 0 4px 6px rgba(10, 10, 10, 10);
    z-index: 10000;
`;

const OptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ChipWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-start;
`;

export {
    ModalWrapper,
    SubWrapper,
    TextContainer,
    Button,
    HeaderWrapper,
    BodyWrapper,
    FooterWrapper,
    OptionWrapper,
    ChipWrapper,
};