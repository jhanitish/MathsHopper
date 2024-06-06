import * as PIXI from "pixi.js";
import { App } from '../system/App';
import { gameState } from "../system/gameState";

/**
 * The Oracle class handles all the methods related to the Oracle.
 */
export class Oracle {
    /**
     * This class is responsible for helping the user whenever they are stuck.
     * @param {object} gameScene This class expects one parameter which is the gameScene object.
     */
    constructor(gameScene) {
        this.app = App.app;
        this.image = App.sprite("oracle");
        this.gameScene = gameScene;
    }

    /**
     * This method is responsible for the event handling when users click on the Oracle.
     */
    onImageClick() {
        // this.gameScene.pauseGame(); // Pause the game when chat is opened
        gameState.isPaused = true;
        var modal = document.getElementById("OracleScreen");
        modal.style.display = "block";
    }

    /**
     * The addMessageToChat method is responsible for displaying text.
     * @param {string} message This method expects one parameter which is what will be displayed on the screen.
     */

    addMessageToChat(message) {
        const style = new PIXI.TextStyle({
            fill: '#000000',
            fontSize: 16,
            wordWrap: true,
            wordWrapWidth: 280 // Adjust the width according to your design
        });

        const text = new PIXI.Text(message, style);
        text.x = 10; // Adjust horizontal positioning
        text.y = 10 + this.chatContainer.children.length * 25; // Adjust vertical positioning
        this.chatContainer.addChild(text);
    }

    /**
     * The createImage method configures the Oracle image so that it can be interactive.
     * @param {*} x X-axis position.
     * @param {*} y Y-axis position.
     * @param {*} width Width of the image.
     * @param {*} height Height of the image.
     */
    createImage(x, y, width, height) {
        this.image.interactive = true;
        this.image.buttonMode = true;
        this.image.x = x;
        this.image.y = y;
        this.image.width = width;
        this.image.height = height;
        this.image.on('pointerdown', this.onImageClick.bind(this));
        this.app.stage.addChild(this.image);
    }
}