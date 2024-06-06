import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from "./Loader";
import { ScenesManager } from "./ScenesManager";
import { generateMathObjectsArray } from '../../utils/generateMaths';
import { gameState } from './gameState';

/**
 * The Application class is responsible for rendering the game including the Matter.js.
 */

class Application {
    /**
     * The run method registers the PixiPlugin with GSAp, which allows for the smooth animations of PIXI properties.
     * @param {object} config The config method takes an object which stores the settings of the game.
     */
    run(config) {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        this.config = config;

        this.app = new PIXI.Application({resizeTo: window});
        // document.body.appendChild(this.app.view);
        document.getElementById('game-canvas').appendChild(this.app.view);

        this.loader = new Loader(this.app.loader, this.config);
        this.mathsObjectArray = generateMathObjectsArray(gameState.difficulty, gameState.level, 12);
        gameState.mathsObjectArray = this.mathsObjectArray;
        this.loader.preload().then(() => this.start("Game"));

        this.scenes = new ScenesManager();
        this.app.stage.interactive = true;
        this.app.stage.addChild(this.scenes.container);
        // [06]
        this.createPhysics();
    }

    /**
     * The creayePhysics function initialises Matter.js as the physics engine for the maths platformer.
     */
    createPhysics() {
        this.physics = Matter.Engine.create();
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, this.physics);
    }
    /**
     * The res method is a utility method which gets the texture resources associated with a given key.
     * @param {string} key The key parameter expects a string which references the ascociated texture.
     * @returns This method returns a PIXI.Texture.
     */

    res(key) {
        return this.loader.resources[key].texture;
    }

    /**
     * This method is responsible for creating new PIXI Sprites using a texture resource.
     * @param {string} key Expected to be a string which is used to identify a specific texture within the loaded resources.
     * @returns This method returns a new PIXI Sprite.
     */

    sprite(key) {
        return new PIXI.Sprite(this.res(key));
    }

    /**
     * This method is used to switch scenes.
     * @param {string} sceneName Expected to be a string which is used to initiate a new instance of the corresponding scene class.
     */
    start(sceneName) {
        // this.scenes.start("Game");
        this.scenes.start(sceneName);
    }
}

export const App = new Application();