import { styled } from "styled-components";
import grassHopper from "../../sprites/grasshopper1.png";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url(${grassHopper});
    background-repeat: no-repeat;
`;
const HeadingWrapper = styled.div`
    display: flex;
    position: relative;
`;
const Heading = styled.h1`
    color: #fff;
    font-size: 32px;
`;
const SubWrapper = styled.div`
    width: 450px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 5px solid #0098a0;
    border-radius: 2px;
    border-top-left-radius: 50px;
    border-bottom-right-radius: 50px;
    padding: 10px;
    color: #fff;
    justify-content: space-evenly;
    &:hover {
        box-shadow: 0 4px 6px rgba(10, 10, 10, 10);
    }
`;
const Title = styled.h2`
    
`;
const Input = styled.input`
    width: 300px;
    padding: 10px;
    outline: none;
    &:hover {
        box-shadow: 0 4px 6px rgba(10, 10, 10, 10);
    }
`;
const Button = styled.button`
    width: 100px;
    padding: 10px;
    background: #2b838c;
    border: 4px solid #0098a0;
    border-radius: 2px;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    color: #fff;
    &:hover {
        box-shadow: 0 4px 6px rgba(10, 10, 10, 10);
    }
`;
const ButtonWrapper = styled.div`
    display: flex;
    gap: 20px;
`;
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 60px;
`;
const ErrorText = styled.span`
    max-height: 0;
    overflow: hidden;
    color: red;
    transition: max-height 0.3s ease-in-out;
    &.expanded {
        max-height: 20px;
    }
`;

export {
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
}