import React, { useEffect, useState } from "react";
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
import { gameState as gameMainState } from "../../scripts/system/gameState";

const GameOver = ({ toggleScenes }) => {
    const gameStateVal = JSON.parse(localStorage.getItem("gameState"));
    const [gameState, setGameState] = useState({});
    const [perc, setPerc] = useState(0);

    // this is to used to triggere react dom event so that useEffect works
    const [eve, setEve] = useState(0);

    useEffect(() => {
        if(gameStateVal && JSON.stringify(gameStateVal) !== JSON.stringify(gameState) && eve === 1) {
            const correctAnswer = gameStateVal.correctAnswers;
            const totalQuestions = gameStateVal.questionIndex;
            const percVal = (correctAnswer/totalQuestions)*100;
            setPerc(percVal);
            setGameState({...gameStateVal});
        }
    }, [gameStateVal, gameStateVal.questionIndex, gameStateVal.correctAnswers, eve]);
    const onClose = () => {
        const modal = document.getElementById("gameOver");
        modal.style.display = "none";
        const getCompletedGameState = JSON.parse(localStorage.getItem("completedGameState"));
        const activeGameState = JSON.parse(localStorage.getItem("activeGameState"));
        if(perc >= 40) {
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
        }
        gameMainState.isPaused = false;
        window.location.reload();
        setEve(0);
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
                    {perc >= 40 ? 'Congratulations, you cleared the level' : 'Keep playing to clear the level'}
                </TextContainer>
                <Circle>
                    <TextContainer>{gameState?.correctAnswers || 0}</TextContainer>
                    <Line />
                    <TextContainer>{Number(gameState?.questionIndex) > 10 ? 10 : 10 || 0}</TextContainer>
                </Circle>
                <Button onClick={onClose}>Home Screen</Button>
                <Button onClick={() => setEve(1)} id="gameOverButton" style={{ visibility: 'hidden' }}>Click</Button>
            </ContentWrapper>
        </SubWrapper>
      </ModalWrapper>
    );
  };

export default GameOver;