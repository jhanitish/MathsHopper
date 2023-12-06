import React, { useState } from 'react';
import NameInput from './InputBox';
import Levels from './Levels';
import { Wrapper } from './style';

const MyReactApp = ({toggleScenes}) => {
  const [showLevel, setShowLevel] = useState(false);
  const [user, setUser] = useState("");
  
  return (
    <Wrapper>
      {
        showLevel ? <Levels onBackClick={setShowLevel} onStartClick={toggleScenes} user={user} /> : <NameInput onSubmitClick={setShowLevel} setUser={setUser} />
      }
    </Wrapper>
  );
};

export default MyReactApp;
