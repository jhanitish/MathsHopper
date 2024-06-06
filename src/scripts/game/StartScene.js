// Create PIXI Application
import * as PIXI from "pixi.js";
import { App } from "../system/App";

/**
 * The StartScene class is initial screen that is rendered when the users begin the game. This class is responsible for displaying the initial interface elements.
 */
export class StartScene {
    constructor() {
      this.container = new PIXI.Container();
  
      // Create your start scene elements, buttons, etc.
      // Add them to this.container
  
      // Example button for transitioning to the next scene
      const startButton = new PIXI.Graphics();
      startButton.beginFill(0xFF0000);
      startButton.drawRect(0, 0, 100, 50);
      startButton.endFill();
      startButton.interactive = true;
      startButton.buttonMode = true;
      startButton.on('pointerdown', () => this.onClickStart());
      this.container.addChild(startButton);
    }
  
    onClickStart() {
      // Transition to the next scene (e.g., GameScene)
      App.start('Game');
    }
  }
