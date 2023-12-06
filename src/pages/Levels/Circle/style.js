import { styled, keyframes, css } from "styled-components";

const spinPulse = keyframes`
  0% {
    transform: rotate(160deg);
    opacity: 0;
    box-shadow: 0 0 1px #bdd73c;
  }
  50% {
    transform: rotate(145deg);
    opacity: 1;
  }
  100% {
    transform: rotate(-320deg);
    opacity: 0;
  }
`;

const spinoffPulse = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const CircleWrapper = styled.div`
  position: relative;
  height: 175px;
`;

const OuterCircle = styled.div`
    background-color: transparent;
    border: 3px solid ${props => props.disabled ? '#f3f4f7' : '#0098a0'};
    opacity: 0.9;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-radius: 100px;
    width: 130px;
    height: 130px;
    margin: 0 auto;
    border-style: ridge;
    &.active {
        animation: ${spinPulse} 3s infinite ease-in-out;
    }
`;

const InnerCircle1 = styled.div`
    background-color: transparent;
    border: 5px solid ${props => props.disabled ? '#f3f4f7' : '#0098a0'};
    opacity: 0.9;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-radius: 100px;
    border-style: groove;
    top: -124px;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    position: relative;
    ${props => !props.disabled && css`
      animation: ${spinoffPulse} 1s infinite linear;
    `}
`;

const InnerCircle2 = styled.div`
    background-color: transparent;
    border: 2px solid ${props => props.disabled ? '#f3f4f7' : '#0098a0'};
    opacity: 0.9;
    border-radius: 50%;
    top: -230px;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0 0 20px ${props => props.disabled ? '#f3f4f7' : '#0098a0'};
`;

const InnerText = styled.span`
    color: #fff;
    font-size: 50px;
    font-weight: 600;
    &.active {
        color: #0098a0;
    }
`;

export {
    CircleWrapper,
    OuterCircle,
    InnerCircle1,
    InnerCircle2,
    InnerText,
};