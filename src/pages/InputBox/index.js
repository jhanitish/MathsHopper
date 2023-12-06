import React, {useEffect, useState} from "react";
import {
    Wrapper,
    HeadingWrapper,
    Heading,
    SubWrapper,
    Title,
    Input,
    Button,
    ButtonWrapper,
    InputWrapper,
    ErrorText,
} from './style';

const NameInput = ({ onSubmitClick, setUser }) => {
    const [inputValue, setInputValue] = useState('');
    const [showError, setShowError] = useState(false);
    useEffect(() => {
        if(inputValue.length > 0) {
            setShowError(false);
        }
    }, [inputValue]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(inputValue.length < 1) {
            setShowError(true);
        } else {
            setUser(inputValue);
            onSubmitClick(true);
        }
    };
    const clearInput = () => {
        setInputValue('');
    }
    return(
        <Wrapper key="input">
            <HeadingWrapper>
                <Heading>MathsHopper</Heading>
            </HeadingWrapper>
            <SubWrapper>
                <Title>ENTER YOUR NAME</Title>
                <InputWrapper>
                    <Input
                        placeholder="ENTER YOUR NAME..."
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <ErrorText className={showError ? 'expanded' : ''}>Please enter your name.</ErrorText>
                </InputWrapper>
                <ButtonWrapper>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={clearInput}>Clear</Button>
                </ButtonWrapper>
            </SubWrapper>
        </Wrapper>
    );
};

export default NameInput;