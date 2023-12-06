import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {
    CircleWrapper,
    OuterCircle,
    InnerCircle1,
    InnerCircle2,
    InnerText,
} from './style';

const Circle = ({ numbers, selectedNumbers, onSelectNumbers, disabled = true}) => {
    const [activeNumber, setActiveNumber] = useState(0);
    const [selectNumber, setSelectNumber] = useState(0);
    useEffect(() => {
        if(selectedNumbers) {
            setSelectNumber(selectedNumbers);
        }
    }, [selectedNumbers]);
    return(
        <CircleWrapper
            key={numbers}
            onMouseEnter={() => setActiveNumber(numbers)}
            onMouseLeave={() => setActiveNumber(0)}
            onClick={() => !disabled ? onSelectNumbers(numbers) : undefined}
        >
            <OuterCircle disabled={disabled} className={clsx({ ['active']: (numbers === activeNumber && !disabled) })} />
            <InnerCircle1 disabled={disabled} />
            <InnerCircle2 disabled={disabled} >
                <InnerText className={clsx({ ['active']: numbers === selectNumber })}>
                    {numbers}
                </InnerText>
            </InnerCircle2>
        </CircleWrapper>
    );
};

export default Circle;