import * as PIXI from "pixi.js";
import { App } from "./App";
import { gameState } from "./gameState";

/**
 * The ScenesManger class uses the PIXI.js library for rendering. The job of this class is to manage the rendering of different scenes.
 */

export class ScenesManager {
    constructor() {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.scene = null;
    }

    /**
     * Responsible for switching scenes by checking if a scene is present if a scene is present the destroy function is called which cleans up any resources it was using.
     * @param {object} scene 
     */

    start(scene) {
        if (this.scene) {
            this.scene.destroy();
        }

        this.scene = new App.config.scenes[scene]();
        this.container.addChild(this.scene.container);
        gameState.currentScene = scene;
    }

    /**
 * This method is called within the game loop to update the current scene.
 * It should be executed every frame to update the state and render the scene.
 * @param {number} dt - Represents the delta time since the last update call, usually in seconds or milliseconds. It is used to ensure smooth and consistent updates and movements within the game.
 */
    update(dt) {
        if (this.scene && this.scene.update) {
            this.scene.update(dt);
        }
    }

}