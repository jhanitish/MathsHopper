import * as PIXI from "pixi.js";
import { Sound } from '@pixi/sound';
import { App } from "../system/App";
import {gameState} from "../system/gameState";
import music from "../../sounds/Miles.mp3";

export class Background {
    constructor() {
        this.speed = App.config.bgSpeed;
        this.container = new PIXI.Container();
        this.createSprites();
        this.sound = this.onSoundStart();
    }

    createSprites() {
        this.sprites = [];

        for (let i = 0; i < 3; i++) {
            this.createSprite(i);
        }
    }

    createSprite(i) {
        const sprite = App.sprite("bg");

        sprite.x = sprite.width * i;
        sprite.y = 0;
        this.container.addChild(sprite);
        this.sprites.push(sprite);
    }

    move(sprite, offset) {
        const spriteRightX = sprite.x + sprite.width;

        const screenLeftX  = 0;

        if (spriteRightX <= screenLeftX) {
            sprite.x += sprite.width * this.sprites.length;
        }
        
        sprite.x -= offset;
    }

    update(dt) {
        if (!gameState.isPaused) { // Only move if isMoving is true
            const offset = this.speed * dt;
            this.sprites.forEach(sprite => {
                this.move(sprite, offset);
            });
        }
    }

    onSoundStart() {
        // Load the sound
        const sound = Sound.from({
            url: music,
            autoPlay: true,
            loop: true,
            loaded: function(err, sound) {
                if (!err) {
                    console.log('Sound loaded and playing.');
                } else {
                    console.error('Error loading sound:', err);
                }
            }
        });

        return sound;
    }

    onSoundStop() {
        this.sound.stop();
    }

    toggleMovement() {
        this.isMoving = !this.isMoving;
    }

    destroy() {
        this.container.destroy();
    }
}