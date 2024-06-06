import { Tools } from "../system/Tools";
import { GameScene } from "./GameScene";

export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    bgSpeed: 2,
    enemies: {
        chance: 0.9,
        offset: {
            min: 210,
            max: 210
        }
    },
    clouds: {
        chance: 0.9,
        offset: {
            min: 510,
            max: 510
        }
      },
    platforms: {
        moveSpeed: -1.5,
        ranges: {
            rows: {
                min: 2,
                max: 5
            },
            cols: {
                min: 5,
                max: 9
            },
            offset: {
                min: 60,
                max: 200
            }
        }
    },
    hero: {
        jumpSpeed: 15,
        maxJumps: 2,
        position: {
            x: 350,
            y: 595
        }
    },
    scenes: {
        "Game": GameScene,
    }
};