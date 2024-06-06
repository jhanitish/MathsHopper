import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { gameState } from "../system/gameState";
import { Platform } from "./Platform";

/**
 * The Platforms class is designed to maange a collection of platforms. This class handles creation, updating and destruction of platforms.
 */

export class Platforms {
    /**
     * @param {object} hero This class expects the hero object to be passed to the constructor.
     */
    constructor(hero) {
        this.platforms = [];
        this.container = new PIXI.Container();
        this.hero = hero
        this.currentPlatform = 0
        this.createPlatform({
            rows: 4,
            cols: 6,
            x: 200,
        });
    }
    /**
     * The randomData method is responsible for generating randomised properties for creating a new platform. This function returns an object of randomised objects.
     */
    get randomData() {
        this.ranges = App.config.platforms.ranges;
        let data = { rows: 0, cols: 0, x: 0 };

        const offset = this.ranges.offset.min + Math.round(Math.random() * (this.ranges.offset.max - this.ranges.offset.min));

        data.x = this.current.container.x + this.current.container.width + offset;
        data.cols = this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));
        data.rows = this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

        return data;
    }

    /**
     * The createPlatform method is responsible for creating a new platform, this platform is added to the container and platform array, then the current platform is updated to the new platform.
     * @param {object} data This function takes an object with the fields row, cols and x. The row & cols fields are passed to the createTiles and createTile methods are part of a class that manages the creation of a grid of tiles,x is passed to the createContainer method which uses this value to position the container across the x axis.
     */
    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x,this.hero, this.platforms.length);
        this.container.addChild(platform.container);
        this.platforms.push(platform);
        this.current = platform;
    }
    /**
     * The update method is responsible for updating the number of platforms which are shown if the game has not been paused.
     */
    update() {
        if(!gameState.isPaused){
            if (this.current.container.x + this.current.container.width < window.innerWidth) {
                this.createPlatform(this.randomData);
            }
    
            // 06
            this.platforms.forEach(platform => platform.move());
        }
    }
    

    /**
 * The destroy method is used to clean up resources and prevent memory leaks.
 */
    destroy() {
        this.platforms.forEach(platform => platform.destroy());
        this.container.destroy();
    }
}