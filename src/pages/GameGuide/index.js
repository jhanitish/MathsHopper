import React, { useState } from 'react';
import {
    Image,
    ModalContainer,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from './style';
import gameGuideIcon from '../../sprites/gameGuide.png';
import screen1 from '../../sprites/screen1.png';
import screen2 from '../../sprites/screen2.png';
import screen3 from '../../sprites/screen3.png';
import screen4 from '../../sprites/screen4.png';
import screen5 from '../../sprites/screen5.png';
import screen6 from '../../sprites/screen6.png';
import screen7 from '../../sprites/screen7.png';
import screen8 from '../../sprites/screen8.png';
import screen9 from '../../sprites/screen9.png';
import screen10 from '../../sprites/screen10.png';
import screen11 from '../../sprites/screen11.png';
import screen12 from '../../sprites/screen12.png'; 
import screen13 from '../../sprites/screen13.png';
import screen14 from '../../sprites/screen14.png';
import screen15 from '../../sprites/screen15.png';
import screen16 from '../../sprites/screen16.png';
import screen17 from '../../sprites/screen17.png';
import screen18 from '../../sprites/screen18.png';
import { Close } from '../icons/close';
import { Maximize, Minimize } from '../icons';


const GameGuide = () => {
    const imgArr = [
        screen1, screen2, screen3, screen4,
        screen5, screen6, screen7, screen8,
        screen9, screen10, screen11, screen12,
        screen13, screen14, screen15, screen16,
        screen17, screen18,
    ];

    const [showModal, setShowModal] = useState(false);
    const [currIndex, setCurrIndex] = useState(0);
    const [isMini, setIsMini] = useState(true);

    const toggleModal = () => {
        setCurrIndex(0);
        setShowModal(!showModal);
    };
    const onNextClick = () => {
        setCurrIndex((prev) => prev + 1);
    };

    const onPrevClick = () => {
        setCurrIndex((prev) => prev - 1);
    }

    const onMiniCall = () => {
        setIsMini(prev => !prev);
    }
    return (
        <>
            <Image src={gameGuideIcon} alt="gameGuide" onClick={toggleModal} />
        
            {showModal && (
                <ModalContainer isMini={isMini}>
                    <ModalHeader>
                        {isMini ? <Minimize onClick={onMiniCall} /> : <Maximize onClick={onMiniCall} />}
                        <h3>Game Tour Guide</h3>
                        <Close onClick={toggleModal} />
                    </ModalHeader>
                    <ModalBody bgImg={imgArr[currIndex]} isMini={isMini} />
                    <ModalFooter>
                        <div>
                            <button onClick={toggleModal}>Skip</button>
                        </div>
                        <div>{currIndex+1 < 10 ? `0${currIndex+1}` : currIndex+1}/{imgArr.length}</div>
                        <div>
                            <button disabled={currIndex === 0} onClick={onPrevClick}>Prev</button>
                            <button disabled={currIndex === imgArr.length - 1} onClick={onNextClick}>Next</button>
                        </div>
                    </ModalFooter>
                </ModalContainer>
            )}

        </>
    );
};

export default GameGuide;
