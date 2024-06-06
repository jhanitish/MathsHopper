import React, { useEffect, useRef, useState } from 'react';
import {
    ProgressButton,
    Sidebar,
    SidebarSubWrapper,
    Heading,
    ProgressData,
    ProgressSub,
    SubMain,
    SubHeading,
    SubText,
} from './style';
import { ProgressIcon } from '../icons';

const ProgressTracker = () => {
    const sidebarRef = useRef(null);
    const progressResult = JSON.parse(localStorage.getItem("progressReport"));
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [isOpen]);

    const toggleProgressBar = (event) => {
        event.stopPropagation();
        setIsOpen((prev) => !prev);
    }

  return (
    <>
        <ProgressButton onClick={toggleProgressBar}>
          <ProgressIcon />
        </ProgressButton>
        <Sidebar ref={sidebarRef} isOpen={isOpen}>
            <SidebarSubWrapper>
                <Heading>Progress Tracker</Heading>
                <ProgressData>
                    {
                        progressResult?.length > 0 ? progressResult.map((val) => {
                            return (
                                <ProgressSub>
                                    <SubMain><SubHeading>User:</SubHeading> <SubText>{val?.user || ""}</SubText></SubMain>
                                    <SubMain><SubHeading>Status:</SubHeading> <SubText>{val?.stats || ""}</SubText></SubMain>
                                    <SubMain><SubHeading>Level:</SubHeading> <SubText>{val?.level || ""}</SubText></SubMain>
                                    <SubMain><SubHeading>Type:</SubHeading> <SubText>{val?.type || ""}</SubText></SubMain>
                                    <SubMain><SubHeading>Score:</SubHeading> <SubText>{val?.score || ""}</SubText></SubMain>
                                </ProgressSub>
                            )
                        }) : <h3>No Progress Data found, start playing game to see your progress report here!!!</h3>
                    }
                    
                </ProgressData>
            </SidebarSubWrapper>
        </Sidebar>
    </>
  );
};

export default ProgressTracker;
