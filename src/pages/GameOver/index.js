import React from "react";
import {
    ModalWrapper,
    SubWrapper,
    ImageContainer,
    Image,
    ContentWrapper,
    TextContainer,
    Circle,
    Button,
    Line,
} from "./style";
import winningImage from '../../sprites/winning2.png';
import { gameState } from "../../scripts/system/gameState";

const GameOver = ({ toggleScenes }) => {

    const onClose = () => {
        const modal = document.getElementById("gameOver");
        modal.style.display = "none";
        const getCompletedGameState = JSON.parse(localStorage.getItem("completedGameState"));
        const activeGameState = JSON.parse(localStorage.getItem("activeGameState"));
        const difficulty = gameState.difficulty;
        const completedState = {
            totalAnswers: gameState.questionIndex,
            correctAnswers: gameState.correctAnswers,
            level: gameState.level,
            userInfo: gameState.userInfo,
            difficulty,
        }
        if(!getCompletedGameState) {
            const arr = [completedState];
            const completedGameState = {
                [difficulty] : arr,
            }
            localStorage.setItem("completedGameState", JSON.stringify(completedGameState));
        } else {
            let stateObj = {};
            const activeDifficulty = getCompletedGameState[difficulty];
            if(activeDifficulty?.length > 0) {
                const arr = [];
                activeDifficulty.forEach((curr) => {
                    if(curr.level === gameState.level && curr.difficulty === difficulty && gameState.correctAnswers >= curr.correctAnswers) {
                        arr.push(completedState);
                    } else {
                        arr.push(curr);
                    }
                });
                const newState = {
                    [difficulty] : arr
                }
                stateObj = {...getCompletedGameState, ...newState };
            } else {
                const arr = [completedState];
                const newState = {
                    [difficulty] : arr,
                };
                stateObj = {...getCompletedGameState, ...newState };
            }
            localStorage.setItem("completedGameState", JSON.stringify(stateObj));
        }

        if(activeGameState){ 
            if(activeGameState.level == gameState.level) {
                const obj = {...activeGameState, isCompleted: true};
                localStorage.setItem("activeGameState", JSON.stringify(obj));
            }
        }

        toggleScenes();
    }
    return (
      <ModalWrapper id="gameOver">
        <SubWrapper>
            <ImageContainer>
                <Image src={winningImage} alt="Congratulations" />
            </ImageContainer>
            <ContentWrapper>
                <TextContainer>
                    Congratulations!
                </TextContainer>
                <Circle>
                    <TextContainer>{gameState.correctAnswers}</TextContainer>
                    <Line />
                    <TextContainer>{gameState.questionIndex}</TextContainer>
                </Circle>
                <Button onClick={onClose}>Home Screen</Button>
            </ContentWrapper>
        </SubWrapper>
      </ModalWrapper>
    );
  };

export default GameOver;