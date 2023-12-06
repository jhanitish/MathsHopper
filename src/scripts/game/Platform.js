import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';
import { QuestionCloud } from './QuestionCloud';
// [10]
import { Diamond } from './Diamond';
import { gameState } from '../system/gameState';
import { GameScene } from './GameScene';


export class Platform {
    constructor(rows, cols, x,hero, platformCount) {
        // [10]
        this.diamonds = [];
        this.warningClouds = [];
        this.questionClouds=[];
        this.rows = rows;
        this.cols = cols;
        this.hero = hero;
        this.tileSize = PIXI.Texture.from("tile").width;
        this.width = this.tileSize * this.cols;
        this.height = this.tileSize * this.rows;
        this.createContainer(x);
        this.createTiles();
        this.dx = App.config.platforms.moveSpeed;
        this.createBody();
        this.createDiamonds(platformCount);
        this.createQuestionClouds(this.questionClouds);
    }

    // [10]
    createDiamonds(platformCount) {
        const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min); 
            if (Math.random() < App.config.diamonds.chance && platformCount > 0) {
                if(gameState.questionIndex<20){
                    gameState.questionIndex+=1
                }else{
                    const gameOver = new GameScene();
                    gameOver.showModal();
                }
                this.createDiamond(this.tileSize * 1, -y +100);
                console.log({state:gameState.questionIndex,platformCount});
            }else{
            }
    }

    removeDiamond(diamond) {
        // Remove the diamond from the PIXI container
        this.container.removeChild(diamond.sprite);
    
        // Remove the diamond's Matter.js body from the world
        Matter.World.remove(App.physics.world, diamond.body);
    
        // Remove the diamond from the diamonds array
        const index = this.diamonds.indexOf(diamond);
        if (index > -1) {
            this.diamonds.splice(index, 1);
        }
    }
    

    handleCloudSelection(selectedOption,index) {
        console.log(selectedOption, App.mathsObjectArray[index].tans, index);
        let correctAnswer = false;
    if (selectedOption === App.mathsObjectArray[index-1].tans) {
        this.hero.addScore(10);
        correctAnswer = true;
        gameState.correctAnswers+=1;

        if (this.diamonds.length > 0) {
            this.diamonds[0].startFalling(); // Make the first diamond fall
            // Optionally remove the diamond from the array if it should only fall once
            this.diamonds.shift(); 
        }
    } else {
        this.hero.reduceHearts(1)
        gameState.wrongAnswers += 1;
    }

        // Change cloud colors
        this.questionClouds.forEach(cloud => {
            if (cloud.option1 === selectedOption || cloud.option2 === selectedOption) {
                // Change to green if correct, red if incorrect
                cloud.changeColor(correctAnswer ? 0x00FF00 : 0xFF0000);
            }
        });

        
    }

    
    

    createQuestionClouds(cloudArray) {
        // Clear existing clouds
        cloudArray.forEach(cloud => {
            cloud.container.destroy(); // Destroy each cloud's container
        });
    
        // Clear the array by setting its length to 0 (affects the original array)
        cloudArray.length = 0;
        const options = [App.mathsObjectArray[gameState.questionIndex].tans,App.mathsObjectArray[gameState.questionIndex].fans];
        const y = -400; // Adjust Y position as needed
    
        if (this.diamonds.length) {
            const xMultiplier = 2; // You can adjust this value to increase the spacing
            for (let i = 0; i < options.length; i++) {
                const option = i === 0 ? App.mathsObjectArray[gameState.questionIndex].tans : App.mathsObjectArray[gameState.questionIndex].fans;
                const cloud = new QuestionCloud(this.tileSize * xMultiplier * (i + 1), y, option);
                cloud.container.interactive = true;
                cloud.container.buttonMode = true;
                cloud.container.on('pointerdown', () => this.handleCloudSelection(option,gameState.questionIndex));
                this.container.addChild(cloud.container);
                cloudArray.push(cloud); // Add the new cloud to the array
            }
        }
    }
    
 
    createDiamond(x, y) {
            const diamond = new Diamond(x, y, this.container);
            this.container.addChild(diamond.sprite);
            diamond.createBody();
            this.diamonds.push(diamond);
    }
    // [/10]

    createBody() {
        this.body = Matter.Bodies.rectangle(this.width / 2 + this.container.x, this.height / 2 + this.container.y, this.width, this.height, {friction: 0, isStatic: true});
        Matter.World.add(App.physics.world, this.body);
        this.body.gamePlatform = this;
    }

    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = window.innerHeight - this.height;
    }




    createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }
        }
    }

    createTile(row, col) {
        const texture = row === 0 ? "platform" : "tile" 
        const tile = App.sprite(texture);
        this.container.addChild(tile);
        tile.x = col * tile.width;
        tile.y = row * tile.height;
    }


    // 06
    move() {
        if (this.body) {
            Matter.Body.setPosition(this.body, {x: this.body.position.x + this.dx, y: this.body.position.y});
            this.container.x = this.body.position.x - this.width / 2;
            this.container.y = this.body.position.y - this.height / 2;
        }
    }

    destroy() {
        Matter.World.remove(App.physics.world, this.body);
        this.diamonds.forEach(diamond => diamond.destroy());
        this.container.destroy();
    }
}