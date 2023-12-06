import { styled } from "styled-components";

const LevelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 20px;
    gap: 150px;
`;

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
`;

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ButtonWrapper = styled.button`
    width: 100px;
    padding: 10px;
    background: #2b838c;
    border: 4px solid #0098a0;
    border-radius: 5px;
    color: #fff;
    &:hover {
        box-shadow: inset 0px 0px 10px 0px rgb(10 10 10);
    }
`;

const TitleWrapper = styled.h2`
    margin: 0;
    color: #fff;
    font-size: 40px;
`;

const EmptyWrapper = styled.div``;

const LevelIndicator = styled.div`
    display: flex;
    flex-direction: row;
    width: 50%;
    overflow: hidden;
    flex-wrap: wrap;
    column-gap: 20px;
    max-height: 175px;
    overflow-y: scroll;
    /* For WebKit-based browsers (Chrome, Safari) */
    &::-webkit-scrollbar {
        width: 5px; /* Set the width of the scrollbar */
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: transparent; /* Set a background color or leave transparent */
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #fff; /* Color of the scrollbar */
        border-radius: 5px; /* Rounded corners */
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #fff; /* Color of the scrollbar when hovered */
    }

`;

const DifficultyIndicator = styled.div`
    position: relative;
    display: flex;
    gap: 30px;
    flex-direction: column;
    height: 220px;
    align-items: center;
    width: 50%;
`;

const CardWrapper = styled.div`
    display: flex;
    gap: 30px;
`;

const StartButton = styled(ButtonWrapper)`
    width: 150px;
    box-shadow: 0 0 5px 2px #0098a0;
    background: #2b838c;
    border: 4px solid #0098a0;
    position: absolute;
    transition: .5s;
    transform: 'translate(-50%, -50%)';
    left: unset;
    right: unset;
    &:hover {
        box-shadow: 0 0 5px 2px #0098a0;
        ${props => props.$allowclick === "false" && 'left: ${Math.ceil(Math.random() * 90)}%; top: ${Math.ceil(Math.random() * 90)}%;'}
    }
`;

const StartWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    position: relative;
    flex-direction: row;
`;

export {
    LevelWrapper,
    HeaderWrapper,
    BodyWrapper,
    ButtonWrapper,
    TitleWrapper,
    EmptyWrapper,
    LevelIndicator,
    DifficultyIndicator,
    CardWrapper,
    StartButton,
    StartWrapper,
};