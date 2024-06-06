import React from "react";
import { Button } from "./style";

const Chip = ({value = "", disabled = false, onClick = () => {}}) => {
    return (
        <>
            <Button onClick={onClick} disabled={disabled}>
                {value}
            </Button>
        </>
    )
}

export default Chip;