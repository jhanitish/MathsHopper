import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import MyReactApp from './pages';
import { App } from "./scripts/system/App";
import { Config } from "./scripts/game/Config";
import GameOver from './pages/GameOver';
import OracleUI from './pages/Oracle';

/**
 * This function will display both the homepage and the game over screen.
 * These pages are created using react
 * 
 * @returns eact page
 */

const ReactApp = () => {
  const [showStartScene, setShowStartScene] = useState(true);

  useEffect(() => {
    if (!showStartScene) {
      App.run(Config);
    }
  }, [showStartScene]);

  const toggleScenes = () => {
    setShowStartScene(!showStartScene);
  };

  return (
    <>
      {showStartScene ? (
        <MyReactApp toggleScenes={toggleScenes} />
      ) : (
        <>
          <div id="game-canvas"></div>
          <GameOver toggleScenes={toggleScenes} />
          <OracleUI />
        </>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(
  <ReactApp />
);

