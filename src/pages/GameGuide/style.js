import { styled } from 'styled-components';

const Image = styled.img`
    position: absolute;
    right: 0;
    top: 0;
    width: 80px;
    height: 80px;
    box-shadow: 0 4px 6px rgba(10, 10, 10, 10);
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    width: ${props => props.isMini ? '600px' : '1200px'};
    border: 1px solid #ccc;
    background-color: #fff;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
`;

const ModalBody = styled.div`
    background-image: ${(props) => `url(${props.bgImg})`};
    background-size: ${props => props.isMini ? '600px 342px' : '1200px 540px'};
    background-repeat: no-repeat;
    height: ${props => props.isMini ? '300px' : '500px'};
    padding: 20px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ccc;

    button {
        margin-left: 10px;
    }
`;

const HeaderDiv = styled.div`
    display: flex;
    gap: 10px;
`;

export {
    Image,
    ModalContainer,
    ModalHeader,
    ModalBody,
    ModalFooter,
    HeaderDiv,
}