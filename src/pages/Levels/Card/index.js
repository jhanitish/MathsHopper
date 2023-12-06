import React, {useEffect, useState} from "react";
import clsx from "clsx";
import { CardWrapper, InnerText } from "./style";
import { Lock, Unlock } from "../../icons";

const Card = ({ level, levelSelect, setSelectedLevel, disabled = true }) => {
    const [selectLevel, setSelectLevel] = useState('');
    useEffect(() => {
        if(levelSelect) {
            setSelectLevel(levelSelect);
        }
    }, [levelSelect]);

    const style = {
        position: 'absolute',
        top: '5px',
        right: '10px',
        width: '16px',
        height: '16px',
    }
    return (
        <CardWrapper
            key={level}
            onClick={() => !disabled ? setSelectedLevel(level) : undefined}
            disabled={disabled}
            className={clsx({ ['active']: level === selectLevel })}
        >
            {disabled ? <Lock style={style} /> : <Unlock style={{...style, fill: '#0098a0'}}/> }
            <InnerText
                className={clsx({ ['active']: level === selectLevel })}
            >
                {level.toUpperCase()}
            </InnerText>
        </CardWrapper>
    );
};

export default Card;