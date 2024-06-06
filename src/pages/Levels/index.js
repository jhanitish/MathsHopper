import React, {useEffect, useState} from "react";
import { gameState } from "../../scripts/system/gameState";
import Card from "./Card";
import Circle from "./Circle";
import {
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
} from './style';

const Levels = ({ user, onBackClick, onStartClick }) => {
    const [selectedNumbers, setSelectedNumber] = useState(1);
    const [levelSelect, setSelectedLevel] = useState("easy");
    const [activeLevel, setActiveLevel] = useState(1);
    const [activeCard, setActiveCard] = useState(["easy"]);
    const [levelField, setLevelField] = useState([]);
    const lastLevel = 8;
    const card = ["easy", "medium", "hard"];
    const [allowClick, setAllowClick] = useState(false);
    const activeGame = localStorage.getItem("activeGameState");
    useEffect(() => {
        if(activeGame) {
            const activeGameState = JSON.parse(localStorage.getItem("activeGameState"));
            if(activeGameState.isCompleted) {
                if(activeGameState.level == lastLevel) {
                    if(activeGameState.difficulty === "easy") {
                        setActiveCard((prev) => [...prev, "medium"]); 
                    }

                    if(activeGameState.difficulty === "medium") {
                        setActiveCard((prev) => [...prev, "hard"]);
                    }

                    setActiveLevel(1);
                } else {
                    setActiveLevel(Number(activeGameState.level) + 1);
                    if(activeGameState.difficulty === "medium") {
                        setActiveCard(["easy", "medium"]); 
                    }
    
                    if(activeGameState.difficulty === "hard") {
                        setActiveCard(["easy", "medium", "hard"]);
                    }
                }
            } else {
                setActiveLevel(activeGameState.level);
                if(activeGameState.difficulty === "medium") {
                    setActiveCard(["easy", "medium"]); 
                }

                if(activeGameState.difficulty === "hard") {
                    setActiveCard(["easy", "medium", "hard"]);
                }
            }
            setSelectedNumber(activeGameState.level);
            setSelectedLevel(activeGameState.difficulty);
        }
    }, [activeGame, activeGame.level]);
    useEffect(() => {
        const enableLevelClick = (currlevel) => {
            
            if(activeCard.includes("hard")) {
                if(levelSelect !== "hard") {
                    return false;
                } else {
                    return activeLevel < currlevel;
                }
            } else if(activeCard.includes("medium")) {
                if(levelSelect !== "medium") {
                    return false;
                } else {
                    return activeLevel < currlevel;
                }
            } else {
                return activeLevel < currlevel;
            }
        }
        const arr = [1, 2, 3, 4, 5, 6, 7, 8].map((val) => {
            return {
                level: val,
                difficulty: levelSelect,
                isActive: enableLevelClick(val),
            }
        });
        setLevelField([...arr]);
    }, [activeCard, activeCard.length, levelSelect, activeLevel]);
    useEffect(() => {
        if(selectedNumbers && levelSelect) {
            setAllowClick(true);
        } else {
            setAllowClick(false);
        }
    }, [selectedNumbers, levelSelect]);
    
    const handleMouseEnter = (event) => {
        if(!allowClick) {
            const button = document.getElementById('btn');
            button.style.left = `${Math.ceil(Math.random() * 90)}%`;
            button.style.top = `${Math.ceil(Math.random() * 90)}%`;
        }
    };

    const onStartBtnClick = () => {
        const activeState = {
            "level": selectedNumbers,
            "difficulty": levelSelect,
            "userInfo": user,
            "isCompleted": false,
        }
        localStorage.setItem("activeGameState", JSON.stringify(activeState));
        gameState.level = selectedNumbers;
        gameState.difficulty = levelSelect;
        gameState.userInfo = user;
        gameState.isCompleted = false;
        onStartClick();
    }

    return(
        <LevelWrapper key="level">
            <HeaderWrapper>
                <ButtonWrapper onClick={() => onBackClick(false)}>BACK</ButtonWrapper>
                <TitleWrapper>Level Select</TitleWrapper>
                <EmptyWrapper />
            </HeaderWrapper>
            <BodyWrapper>
                <LevelIndicator>
                    {
                        levelField.map((val) => (
                            <Circle
                                numbers={val.level}
                                selectedNumbers={selectedNumbers}
                                onSelectNumbers={setSelectedNumber}
                                disabled={val.isActive}
                            />)
                        )
                    }
                </LevelIndicator>
                <DifficultyIndicator>
                    <CardWrapper>
                    {
                        card.map((val) => (
                            <Card 
                                level={val}
                                levelSelect={levelSelect}
                                setSelectedLevel={setSelectedLevel}
                                disabled = {!activeCard.includes(val)}
                        />))
                    }
                    </CardWrapper>
                    <StartWrapper>
                        <StartButton id="btn" $allowclick={allowClick.toString()} onMouseOver={handleMouseEnter} onMouseEnter={handleMouseEnter} onMouseMove={handleMouseEnter} onClick={() => onStartBtnClick()}>START</StartButton>
                    </StartWrapper>
                </DifficultyIndicator>
                
            </BodyWrapper>
        </LevelWrapper>
    );
};

export default Levels;