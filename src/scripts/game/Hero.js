import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';
import { gameState } from '../system/gameState';
import { GameScene } from './GameScene';

/**
 * The Hero class represents the hero of the game, with functionalities for movement,physics, interaction, and health management.
 */
export class Hero {
    constructor() {
        this.createSprite();
        this.createBody();
        App.app.ticker.add(this.update, this);
        this.dy = App.config.hero.jumpSpeed;
        this.currentPlatform = null;
        this.previousPlatform = null;
        this.maxJumps = App.config.hero.maxJumps;
        this.jumpIndex = 0;
        this.heartReductionDebounceInterval = 500; // 1 secon
        this.hearts = [];
        this.lastCollidedPlatform = null;
        this.heartsInitialised = false;
        this.maxHearts = gameState.currentHearts < 10?gameState.currentHearts:10; // Set a maximum number of hearts
        gameState.currentHearts = this.maxHearts; // Initialize gameState.currentHeart
        this.health = this.maxHearts; // Initialize health
        // this.initialiseHearts();
    }
    /**
     * This method is responsible for updating the reference of the last collided platform.
     * @param {*} platform This method takes a single argument, platform, which is expected to be a reference to a platform object the hero recently collided with.
     */
    updateLastCollidedPlatform(platform) {
        this.lastCollidedPlatform = platform;
    }
    /**
     * This method is responsible for setting up the hero's health system within the game.
     * Its key responsibilities are are checking if hearts are already initialised, creates heart sprites, updates hearts.
     */
    initialiseHearts() {
        // Check if hearts are already initialized
        if (!this.heartsInitialised) {
            // Create heart sprites for the first time
            for (let i = 0; i < gameState.currentHearts; i++) {
                const heart = App.sprite("heart");
                heart.scale.set(0.02, 0.02);
                heart.x = 900 + (heart.width + 5) * i;
                heart.y = 10;
                App.app.stage.addChild(heart);
                this.hearts.push(heart);
            }
            this.heartsInitialised = true;
        }
        // Update visibility of hearts based on gameState.currentHeart
        this.updateHearts();
    }

    /**
     * This method is responsible for keeping the hero on the platform, this handles the hero interactions.
     * @param {object} platform Takes an argument called platform which is a reference to the platform the hero has landed on reseting the jumpIndex so that the user is able to double jump.
     */
    stayOnPlatform(platform) {
        this.platform = platform;
        this.jumpIndex = 0;
        this.setCurrentPlatform(platform); // Update current and previous platforms
    }
    /**
     * The difference between the setCurrentPlatform and the stayOnPlatform method is that this method checks of the hero has moved from one platform to another.If the platform objects are different, it means the hero has moved to another platform.
     * @param {object} platform The platform object.
     */
    setCurrentPlatform(platform) {
        if (this.currentPlatform !== platform) {
            this.previousPlatform = this.currentPlatform;
            this.currentPlatform = platform;
            this.checkedPreviousPlatform = false; // Reset the flag when landing on a new platform
        }
    }

    /**
     * This method reduces the number of lives available to the hero and calls the gameOver screen if the hero has ran out of lives.
     * @param {number} amount Takes one parameter which is the number of hearts that will be reduced.
     */
    reduceHearts(amount = 1) {
        const currentTime = Date.now();    
        if (currentTime - gameState.lastHeartReductionTime > this.heartReductionDebounceInterval) {
            gameState.currentHearts -= amount;

            if (gameState.currentHearts <= 0) {
                const gameOver = new GameScene();
                gameOver.showModal();
            }
    
            gameState.lastHeartReductionTime = currentTime; // Ensure this value is updated correctly
        } else {
        }
        this.updateHearts();

    }
    

    updateHearts() {
        for (let i = 0; i < this.hearts.length; i++) {
            this.hearts[i].visible = i < gameState.currentHearts;
        }
    }
    /**
     * The startJump function within the hero class is designed to manage the jumping action of the hero character in the game.
     */
    startJump() {
        if (this.platform || this.jumpIndex === 1) {
            ++this.jumpIndex;
            this.platform = null;
            Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
        }
    }


    // [/08]
    /**
     * This method creates the body of the hero.
     */
    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2, this.sprite.width, this.sprite.height, {friction: 0});
        Matter.World.add(App.physics.world, this.body);
        this.body.gameHero = this;
    }
/**
 * The update function plays a role in the game loop by updating the state of the hero. This method also has pause check for when the Oracle has been selected.
 */
    update() {
        if(!gameState.isPaused){
            this.sprite.x = this.body.position.x - this.sprite.width / 2;
            this.sprite.y = this.body.position.y - this.sprite.height / 2;
        
            // Check if the hero falls below the window and has not already been marked as dead
            if (this.sprite.y > window.innerHeight && !this.isDead) {
                this.isDead = true; // Mark the hero as dead to prevent multiple heart reductions
                this.sprite.emit("die");
                this.reduceHearts();
            }
        }
    }
    /**
     * Creates the hero sprite for the walking motions.
     */
    createSprite() {
        this.sprite = new PIXI.AnimatedSprite([
            App.res("walk1"),
            App.res("walk2")
        ]);

        this.sprite.x = App.config.hero.position.x;
        this.sprite.y = App.config.hero.position.y;
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
    }
    /**
     * The destroy method is used to clean up resources and prevent memory leaks.
     */
    destroy() {
        App.app.ticker.remove(this.update, this);
        Matter.World.add(App.physics.world, this.body);
        this.sprite.destroy();
    }
}