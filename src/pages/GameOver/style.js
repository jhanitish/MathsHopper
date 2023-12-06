import styled from "styled-components";

const ModalWrapper = styled.div`
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 500px;
    height: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    flex-direction: column;
    align-items: center;
    z-index: 9999;
`;
const SubWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 50%;
`;

const Image = styled.img`
    position: absolute;
    left: -200px;
    top: 40px;
`;

const ContentWrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    height: 400px;
    justify-content: space-evenly;
    align-items: center;
`;

const TextContainer = styled.div`
    font-size: 26px;
`;

const Circle = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 2px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    rotate: -30deg;
`;

const Line = styled.hr`
    border: 3px solid #000;
    width: 80%;
`;

const Button = styled.button`
    width: 150px;
    height: 50px;
    padding: 10px;
    background: #46852c;
    border: 4px solid #f2f4f142;
    border-radius: 2px;
    color: #fff;
    box-shadow: 0 4px 6px rgba(10, 10, 10, 10);
    z-index: 10000;
`;

export {
    ModalWrapper,
    SubWrapper,
    ImageContainer,
    Image,
    ContentWrapper,
    TextContainer,
    Circle,
    Button,
    Line,
}