import React from "react";
import Options from "./options";

const Screen = ({options = [], heading = "", body}) => {
    return (
        <>
            <h4>
                {heading}
            </h4>
            {body && body}
            <Options options={options} />
        </>
    )
}

export default Screen;