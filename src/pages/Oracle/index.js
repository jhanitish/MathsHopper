import React, { useState } from "react";
import {
    ModalWrapper,
    SubWrapper,
    Button,
    HeaderWrapper,
    BodyWrapper,
    FooterWrapper
} from "./style";
import { gameState } from "../../scripts/system/gameState";
import Screen from "./firstScreen";
import { addition, divison, learnAddition, learnDivison, learnMultiplication, learnSubtraction, multiplication, subtraction } from "../../utils/oracleHelp";
import { Close } from "../icons/close";

const Oracle = () => {
    const [stages, setStages] = useState(1);
    const [step, setStep] = useState("learn");
    const [tutorial, setTutorial] = useState({
        value: "",
        stage: 0,
    });
    const oracleExplanation = (val) => {
        if(val === "subtraction") return subtraction;
        if(val === "multiplication") return multiplication;
        if(val === "divison") return divison;
        return addition;
    }
    const reset = () => {
        setStages(1);
        setStep("learn");
        setTutorial({
            value: "",
            stage: 0,
        });
    }
    const onClose = () => {
        const modal = document.getElementById("OracleScreen");
        modal.style.display = "none";
        gameState.isPaused = false;
        reset();
    }

    const onLearnMaths = () => {
        setStages(2);
        setStep("learn");
    }

    const onGoBack = () => {
        setStages((prev) => prev - 1);
    }

    const onTopicSelect = (value) => {
        setStages(3);
        
        setTutorial((prev) => ({
            value: value,
            stage: prev.value !== value ? 1 : prev.stage + 1,
        }));
    }

    const onTutorialGoBack = () => {
        if(tutorial.stage === 1) {
            setStages((prev) => prev - 1);
        } else {
            setTutorial((prev) => ({
                value: prev.value,
                stage: prev.stage - 1,
            }));
        }
    }

    const moreHelp = (tuto) => {
        return({
        heading: oracleExplanation(tutorial.value).def,
        options: [
            {
                value: "Get More Help",
                onClick: () => onTopicSelect(tutorial.value),
                disabled: tuto.stage > 3 ? true : false,
            },
            {
                value: "Go Back",
                onClick: onTutorialGoBack,
            }
        ]
    })}

    const learnMaths = {
        heading: "Ohh, so you want to learn maths, please choose from below topic to start learning",
        options: [
            {
                value: "Addition",
                onClick: () => onTopicSelect("addition"),
            },
            {
                value: "Subtraction",
                onClick: () => onTopicSelect("subtraction"),
            },
            {
                value: "Multiplication",
                onClick: () => onTopicSelect("multiplication"),
            },
            {
                value: "Divison",
                onClick: () => onTopicSelect("divison"),
            },
            {
                value: "Go Back",
                onClick: onGoBack,
            }
        ]
    }

    const onPlayGameOptions = () => {
        const arr = gameState.mathsObjectArray.length > 0 ?
                        gameState.questionIndex > 0 ?
                            gameState.mathsObjectArray.slice(
                                Math.max(gameState.questionIndex - 4, 0), gameState.questionIndex + 1
                            ) :
                            gameState.mathsObjectArray[0] :
                        [];
        const optArr = arr.map((val) => ({
            value: val.exp,
            onClick: () => onTopicSelect(
                val.operator === "-" ? 
                "subtraction" : 
                val.operator === "*" ? "multiplication" : val.operator === "/" ? "divison" : "addition"),
        }));
        return [...optArr, {
            value: "Go Back",
            onClick: onGoBack,
        }]
    }
    const playGame = {
        heading: "Please select from the below equations, you need help",
        options: onPlayGameOptions()
    }

    const onGameHelp = () => {
        setStages(2);
        setStep("game");
    }

    const initialScreen = {
        heading: "Welcome to MathHopper Oracle, please choose from the option below to get help",
        options: [
            {
                value: "Learn Maths",
                onClick: onLearnMaths
            },
            {
                value: "Get Help in Game",
                onClick: onGameHelp
            }
        ]
    }

    const screenStages = () => {
        if(stages === 2) return step === "game" ? playGame : learnMaths;
        if(stages > 2) return moreHelp(tutorial);
        return initialScreen;
    }

    const body = () => {
        const getData = () => {
            if(tutorial.value === 'addition') {
                if(tutorial.stage === 3) return [addition.logic3];
                if(tutorial.stage === 2) return [addition.logic2];
                if(tutorial.stage > 3) return [learnAddition.res1, learnAddition.res2, learnAddition.res3];
                return [addition.logic1];
            }
            if(tutorial.value === 'subtraction') {
                if(tutorial.stage === 3) return [subtraction.logic3];
                if(tutorial.stage === 2) return [subtraction.logic2];
                if(tutorial.stage > 3) return [learnSubtraction.res1, learnSubtraction.res2, learnSubtraction.res3];
                return [subtraction.logic1];
            }
            if(tutorial.value === 'multiplication') {
                if(tutorial.stage === 3) return [multiplication.logic3];
                if(tutorial.stage === 2) return [multiplication.logic2];
                if(tutorial.stage > 3) return [learnMultiplication.res1, learnMultiplication.res2, learnMultiplication.res3];
                return [multiplication.logic1];
            }
            if(tutorial.value === 'divison') {
                if(tutorial.stage === 3) return [divison.logic3];
                if(tutorial.stage === 2) return [divison.logic2];
                if(tutorial.stage > 3) return [learnDivison.res1, learnDivison.res2, learnDivison.res3];
                return [divison.logic1];
            }
        }
        return (
            <>
                {
                    getData().map((val) => (
                    <h5>
                        {tutorial.stage > 3 ? <a href={val} target="_blank">{val}</a> : val}
                    </h5>))
                }
            </>
        )
    }
    return (
      <ModalWrapper id="OracleScreen">
        <SubWrapper>
            <HeaderWrapper>
                <h3>Game Oracle</h3>
                <Close onClick={onClose}/>
            </HeaderWrapper>
            <BodyWrapper>
                <Screen body={stages > 2 ? body() : undefined} {...screenStages()} />
            </BodyWrapper>
            <FooterWrapper>
                <Button onClick={onClose}>Done</Button>
            </FooterWrapper>
        </SubWrapper>
      </ModalWrapper>
    );
  };

export default Oracle;