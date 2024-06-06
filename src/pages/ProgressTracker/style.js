import styled from 'styled-components';

const ProgressButton = styled.div`
    z-index: 11111;
    margin-left: 0px;
    position: fixed;
    right: 0;
    top: 150px;
    background: #fff;
    box-shadow: 0 4px 6px rgba(10, 10, 10, 10);
    border-left: 0;
    font-size: 18px;
    display: block;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 4px;
    padding: 12px 14px 12px 14px;
    cursor: pointer;

    & svg {
        display: block;
        font-size: 25px;
        fill: #0098a0;
        width: 28px;
        height: 30px;
    }
`;

const Sidebar = styled.div`
    width: 320px;
    height: 100vh;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #fff;
    overflow-x: hidden;
    box-shadow: 0 4px 6px rgba(10, 10, 10, 10);
    transition: transform 0.3s ease-in-out; /* Add smooth animation */
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
`;

const SidebarSubWrapper = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Heading = styled.div`
    font-size: 32px;
    font-weight: 600;
    border-bottom: 2px solid #000;
    padding: 10px;
`;

const ProgressData = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    overflow: hidden;
    overflow-y: auto;
`;
const ProgressSub = styled.div`
    width: 245px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
    box-shadow: 0px 4px 6px 2px rgba(10, 10, 10, 10);
`;

const SubMain = styled.div`
    display: flex;
`;

const SubHeading = styled.div`
    font-size: 20px;
    font-weight: 600;
    padding-right: 5px;
`;

const SubText = styled.div`
    font-size: 20px;
    font-weight: 400;
    text-transform: capitalize;
`;

export {
    ProgressButton,
    Sidebar,
    SidebarSubWrapper,
    Heading,
    ProgressData,
    ProgressSub,
    SubMain,
    SubHeading,
    SubText,
}