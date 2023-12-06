import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Loader } from "./Loader";
import { ScenesManager } from "./ScenesManager";
import { generateMathObjectsArray } from '../../utils/generateMaths';
import { gameState } from './gameState';

class Application {
    run(config) {
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);

        this.config = config;

        this.app = new PIXI.Application({resizeTo: window});
        // document.body.appendChild(this.app.view);
        document.getElementById('game-canvas').appendChild(this.app.view);

        this.loader = new Loader(this.app.loader, this.config);
        this.mathsObjectArray = generateMathObjectsArray(gameState.difficulty, gameState.level, 20);
        this.loader.preload().then(() => this.start("Game"));

        this.scenes = new ScenesManager();
        this.app.stage.interactive = true;
        this.app.stage.addChild(this.scenes.container);
        // [06]
        this.createPhysics();
    }

    createPhysics() {
        this.physics = Matter.Engine.create();
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, this.physics);
    }
    // [/06]

    res(key) {
        return this.loader.resources[key].texture;
    }

    sprite(key) {
        return new PIXI.Sprite(this.res(key));
    }

    start(sceneName) {
        // this.scenes.start("Game");
        this.scenes.start(sceneName);
    }
}

export const App = new Application();