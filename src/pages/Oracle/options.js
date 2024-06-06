import React from "react";
import { OptionWrapper, ChipWrapper, TextContainer } from "./style";
import Chip from "../Chip";

const Options = ({options = []}) => {
    return (
        <OptionWrapper>
            <TextContainer size={15}>Options:</TextContainer>
            <ChipWrapper>
                {options.map((option) => <Chip value={option.value} onClick={option.onClick} disabled={option?.disabled} />)}
            </ChipWrapper>
        </OptionWrapper>
    )
}

export default Options;