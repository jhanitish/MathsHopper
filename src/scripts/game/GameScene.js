import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";

import { LabelScore } from "./LabelScore";
import { App } from '../system/App';
import { Background } from "./Background";
import { Scene } from '../system/Scene';
import { Hero } from "./Hero";
import { Platforms } from "./Platforms";
import { Oracle } from './Oracle';
import { gameState } from '../system/gameState';


export class GameScene extends Scene {
    create() {
        const userInfo = gameState.userInfo;
        const level = gameState.level;
        const difficulty = gameState.difficulty;
        this.question;
        this.createBackground();
        this.createHero();
        this.setEvents();
        //[13]
        this.createUI(userInfo, difficulty, level);
        this.createOracle();
        this.createNewPlatform(this.question);
        //[/13]
    }
    //[13]
    createUI(userInfo,difficulty,level) {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        this.hero.sprite.on("score", () => {
            this.labelScore.renderScore(this.hero.score);
        });

        // Create a label for the user's name
        const userNameLabel = new PIXI.Text(`Player: ${userInfo}`, { /* Styling options */ });
        userNameLabel.x = 10; // Adjust position as needed
        userNameLabel.y = 200; // Adjust position as needed
        this.container.addChild(userNameLabel);

        // Create a label for the difficulty
        const difficultyLabel = new PIXI.Text(`Level: ${difficulty}`, { /* Styling options */ });
        difficultyLabel.x = 10; // Adjust position as needed
        difficultyLabel.y = 150; // Adjust position below the userNameLabel
        this.container.addChild(difficultyLabel);

        // Create a label for the difficulty
        const levelLabel = new PIXI.Text(`Difficulty: ${level}`, { /* Styling options */ });
        levelLabel.x = 10; // Adjust position as needed
        levelLabel.y = 100; // Adjust position below the userNameLabel
        this.container.addChild(levelLabel);
    }
    //[13]

    setEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.gamePlatform);
        const diamond = colliders.find(body => body.gameDiamond);
        if (diamond) {
            if (hero) {
                this.hero.collectDiamond(diamond.gameDiamond);
            }
        } else {
            console.log("No diamond involved in this collision");
        }
    
        if (hero && platform) {
            this.hero.stayOnPlatform(platform.gamePlatform);
        }
    
        
        if (hero && diamond) {
            this.hero.collectDiamond(diamond.gameDiamond);
        }
    }

    createHero() {
        this.hero = new Hero(this.mathProblem);
        this.container.addChild(this.hero.sprite);
        
        this.container.interactive = true;
        window.addEventListener('keydown', this.onSpaceDown.bind(this));

        // [14]
        this.hero.sprite.once("die", () => {
            App.scenes.start("Game");
        });
        // [/14]
    }

    onSpaceDown(event) {
        if (event.code === 'Space') {
            this.hero.startJump();
        }
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }


    createPlatforms(task) {
        this.platforms = new Platforms(task, this.hero);
        this.container.addChild(this.platforms.container);
    }

    createNewPlatform(task) {
        // Ensure all required arguments are passed to the Platforms constructor
        this.platforms = new Platforms(task, this.hero);
        this.container.addChild(this.platforms.container);
    }

    update(dt) {
        if (this.bg) {
            this.bg.update(dt);
        }
        if (this.platforms) {
            this.platforms.update(dt);
        }
    }

    destroy() {
        Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
        App.app.ticker.remove(this.update, this);
        this.bg.destroy();
        this.hero.destroy();
        this.platforms.destroy();
        this.labelScore.destroy();
        window.removeEventListener('keydown', this.onSpaceDown.bind(this));
    }


    createOracle() {
        this.oracle = new Oracle();
        this.oracle.createImage(App.app.renderer.width - 100, App.app.renderer.height - 100, 50, 50);
    }
    showModal() {
        var modal = document.getElementById("gameOver");
        modal.style.display = "block";
    }
}