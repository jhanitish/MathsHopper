import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";

import { App } from '../system/App';
import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Hero } from "./Hero";
import { Platforms } from "./Platforms";
import { Oracle } from './Oracle';
import { gameState } from '../system/gameState';

/**
 * This class represents a specific scene or level and is responsible for managing elements such as the hero, platforms, background, user interface, and the game mechanics.
 */
export class GameScene extends Scene {
    /**
     * The create method initialises the game state and the game scene by calling methods to create the background, hero, UI and the game mechanics.
     */
    create() {
        this.correctAnswer = gameState.correctAnswers;
        this.questionIndex = gameState.questionIndex;
        this.level = gameState.level;
        this.userInfo = gameState.userInfo;
        this.difficulty = gameState.difficulty;
        this.question;
        this.lastHeartReductionTime = 0;
    this.heartReductionDebounceInterval = 1000; // milliseconds
        this.createBackground();
        this.createHero();
        this.setEvents();
        //[13]
        this.createUI(this.userInfo, this.difficulty, this.level);
        this.createOracle();
        this.createNewPlatform(this.question);
        //[/13]
        this.hero.sprite.on('scoreChanged', () => {
            this.updateScoreLabels();
        });
    }
    //[13]
    /**
     * This method sets up UI elements.
     * @param {string} userInfo Username.
     * @param {string} difficulty Game difficulty.
     * @param {number} level Game level.
     */
    createUI(userInfo,difficulty,level) {
        // Create a label for the user's name
        const userNameLabel = new PIXI.Text(`Player: ${userInfo}`, { /* Styling options */ });
        userNameLabel.x = 10; // Adjust position as needed
        userNameLabel.y = 120; // Adjust position as needed
        this.container.addChild(userNameLabel);

        // Create a label for the difficulty
        const difficultyLabel = new PIXI.Text(`Difficulty: ${difficulty}`, { /* Styling options */ });
        difficultyLabel.x = 10; // Adjust position as needed
        difficultyLabel.y = 70; // Adjust position below the userNameLabel
        this.container.addChild(difficultyLabel);

        // Create a label for the difficulty
        const levelLabel = new PIXI.Text(`Level: ${level}`, { /* Styling options */ });
        levelLabel.x = 10; // Adjust position as needed
        levelLabel.y = 20; // Adjust position below the userNameLabel
        this.container.addChild(levelLabel);

       this.correctAnswersLabel = new PIXI.Text(`Correct: ${gameState.correctAnswers}`, { /* Styling options */ });
        this.correctAnswersLabel.x = 10;
        this.correctAnswersLabel.y = 170;
        this.container.addChild(this.correctAnswersLabel);

        this.incorrectAnswersLabel = new PIXI.Text(`Incorrect: ${gameState.wrongAnswers}`, { /* Styling options */ });
        this.incorrectAnswersLabel.x = 10;
        this.incorrectAnswersLabel.y = 220;
        this.container.addChild(this.incorrectAnswersLabel);
    }
    //[13]
    /**
     * Responsible for pausing the game.
     */
    pauseGame() {
        gameState.isPaused = true;
        if(this.bg) {
            this.bg.onSoundStop();
        }
    }
    /**
     * Responsible for resuming the game.
     */
    resumeGame() {
        // And here, logic to resume the game, such as starting the PIXI ticker
        // App.app.ticker.start();
        gameState.isPaused = false;
    }
    /**
     * Collision handler method.
     */
    setEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    }
    /**
     * Responsible for updating teh 
     */
    updateScoreLabels() {
        this.correctAnswersLabel.text = `Correct: ${gameState.correctAnswers}`;
        this.incorrectAnswersLabel.text = `Incorrect: ${gameState.wrongAnswers}`;
    }
    /**
     * This method is responsible for handling collision events in the game, between the hero and the platform. Updating the last platform applying a debounce to prevent excessive calls of the heart reduction method.
     * @param {object} event 
     */
    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.gamePlatform);
        const currentTime = Date.now();
    
        if (hero && platform) {
            this.hero.stayOnPlatform(platform.gamePlatform);
    
            if (this.hero.lastCollidedPlatform !== platform.gamePlatform) {
                this.hero.updateLastCollidedPlatform(platform.gamePlatform); // Update the last collided platform
                // Apply debouncing mechanism
                if (currentTime - this.lastHeartReductionTime > this.heartReductionDebounceInterval) {
                    if (!this.hero.checkedPreviousPlatform && this.hero.previousPlatform && !this.hero.previousPlatform.questionAnswered) {
                        this.hero.reduceHearts();
                        this.lastHeartReductionTime = currentTime;
                        if(gameState.questionIndex>=10){
                        this.showModal();
                        }
                    }
                    this.hero.checkedPreviousPlatform = true;
                }
            }
        }
    }
    
    
    /**
     * Creates the hero character and adds it to the scene.
     */
    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);
        
        this.container.interactive = true;
        window.addEventListener('keydown', this.onSpaceDown.bind(this));

        // [14]
        this.hero.sprite.once("die", () => {
            App.scenes.start("Game");
        });
        // [/14]
    }
    /**
     * Handles keyboard inputs for initialising the hero's jump action.
     * @param {object} event Takes an event object which represents the type of event.  
     */
    onSpaceDown(event) {
        if (event.code === 'Space') {
            this.hero.startJump();
        }
    }
    /**
     * Sets up the background visuals for the game scene.
     */
    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    /**
     * Manges the creation and setup of platforms within the game scene. 
     */
    createPlatforms() {
        this.platforms = new Platforms(this.hero);
        this.container.addChild(this.platforms.container);
    }
    /**
     * Manges the creation and setup of platforms within the game scene. 
     */
    createNewPlatform(task) {
        // Ensure all required arguments are passed to the Platforms constructor
        this.platforms = new Platforms(this.hero);
        this.container.addChild(this.platforms.container);
    }
    /**
     * Updates the backgrounf and platform positions.
     */
    update(dt) {
        if (this.bg) {
            this.bg.update(dt);
        }
        if (this.platforms) {
            this.platforms.update(dt);
        }
    }
    /**
     * The destroy method is used to clean up resources and prevent memory leaks.
     */
    destroy() {
        Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
        App.app.ticker.remove(this.update, this);
        this.bg.destroy();
        this.hero.destroy();
        this.platforms.destroy();
        window.removeEventListener('keydown', this.onSpaceDown.bind(this));
    }

    /**
     * Creates the Oracle character.
     */
    createOracle() {
        this.oracle = new Oracle(this);
        this.oracle.createImage(App.app.renderer.width - 100, App.app.renderer.height - 100, 50, 50);
    }
    /**
     * Displays the gameOver screen.
     */
    showModal() {
        var modal = document.getElementById("gameOver");
        if(modal) modal.style.display = "block";
        // JavaScript code to trigger a click on the button
        const gameOverButton = document.getElementById('gameOverButton');
        if (gameOverButton) {
            gameOverButton.click();
        }
        const totalQuestions = Number(this.questionIndex) > 10 ? 10 : this.questionIndex;
        const gameStateVal = {
            correctAnswers: this.correctAnswer,
            questionIndex: totalQuestions,
            level: this.level,
            userInfo: this.userInfo,
            difficulty: this.difficulty,
        };
        const calc = (corr, tot) => (corr/tot) * 100 >= 40 ? 'Pass' : 'Fail'; 
        const progressObj = {
            user: this.userInfo,
            level: this.level,
            type: this.difficulty,
            stats: calc(this.correctAnswer, totalQuestions),
            score: `${this.correctAnswer}/${totalQuestions}`,
        };
        const progressPrevData = JSON.parse(localStorage.getItem("progressReport"));
        localStorage.setItem("progressReport", JSON.stringify([progressObj, ...progressPrevData]));
        localStorage.setItem("gameState", JSON.stringify(gameStateVal));
        this.pauseGame();
    }
}