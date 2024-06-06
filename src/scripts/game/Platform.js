import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';
import { QuestionCloud } from './QuestionCloud';
// [10]
import { Enemy } from './Enemy';
import { gameState } from '../system/gameState';
import { GameScene } from './GameScene';

/**
 * The Platform class is responsible for the creation and deletion of both platforms, enemies and question clouds. The handling of the selection of user answers.
 */
export class Platform {
    /**
     * The row & cols fields are passed to the createTiles and createTile methods are part of a class that manages the creation of a grid of tiles,x is passed to the createContainer method which uses this value to position the container across the x axis.
     * @param {number} rows 
     * @param {number} cols 
     * @param {number} x 
     * @param {object} hero This parameter is expects to recieve the hero object. 
     * @param {number} platformCount Expects to recieve the count of the number of platforms which will be created by the Platforms class.
     */
    constructor(rows, cols, x,hero, platformCount) {
        // [10]
        this.enemies = [];
        this.warningClouds = [];
        this.questionClouds=[];
        this.rows = rows;
        this.cols = cols;
        this.hero = hero;
        this.questionAnswered = true;
        this.tileSize = PIXI.Texture.from("tile").width;
        this.width = this.tileSize * this.cols;
        this.height = this.tileSize * this.rows;
        this.createContainer(x);
        this.createTiles();
        this.dx = App.config.platforms.moveSpeed;
        this.createBody();
        this.createEnemies(platformCount);
        this.createQuestionClouds(this.questionClouds);
    }

    /**
     * This method is responsible for creating enemies. The creation of enemies is randomly generated on each platform so that an enemy is not present on each platform.
     * @param {number} platformCount This expects to recieve the index of the platform, checking to make sure that an enemy isnt placed upon spawn of the hero.
     */
    createEnemies(platformCount) {
        const y = App.config.enemies.offset.min + Math.random() * (App.config.enemies.offset.max - App.config.enemies.offset.min); 
            if (Math.random() < App.config.enemies.chance && platformCount > 0) {
                this.questionAnswered = false;
                if(gameState.questionIndex<=10){
                    gameState.questionIndex+=1
                }
                if(gameState.questionIndex<=10){
                    this.createEnemy(this.tileSize * 1, -y +100);
                }
            }
    }

    /**
     * This method is responsible for the removal of an enemy from a platform.
     * @param {*} enemy The enemy object
     */
    removeEnemy(enemy) {
        // Remove the enemy from the PIXI container
        this.container.removeChild(enemy.sprite);
    
        // Remove the enemy's Matter.js body from the world
        Matter.World.remove(App.physics.world, enemy.body);
    
        // Remove the enemy from the enemies array
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1);
        }
    }
    
    /**
     * This method is responsible for handling the clouds the user selects. This method also handles the reduction of the heros life and the removal of enemies from the platform.
     * @param {number} selectedOption The selected value to a question.
     * @param {*} index The index of the selected cloud.
     */
    handleCloudSelection(selectedOption,index) {
        let correctAnswer = false
        this.questionAnswered = true
        if (selectedOption === App.mathsObjectArray[index]?.tans) {
            correctAnswer = true;
            gameState.correctAnswers+=1;
            
            if (this.enemies.length > 0) {
                this.enemies[0].startFalling(); // Make the first enemy fall
                // Optionally remove the enemy from the array if it should only fall once
                this.enemies.shift(); 
            }
        } else {
            
            this.hero.reduceHearts()
            gameState.wrongAnswers += 1;
            
        }
        if (index===10){
            const gameOver = new GameScene();
            gameOver.showModal();
        }

    this.hero.sprite.emit('scoreChanged');

        // Change cloud colors
        this.questionClouds.forEach(cloud => {
            if (cloud.optionText === selectedOption) {
                // Change to green if correct, red if incorrect
                cloud.changeColor(correctAnswer ? 0x00FF00 : 0xFF0000);
            }})
            setTimeout(()=>{
                this.removeQuestionClouds();
            },500)
        
    }
    /**
     * This method calls the destroy function.
     */
    removeQuestionClouds() {
        this.questionClouds.forEach(cloud => {
            cloud.container.destroy(); // Destroy each cloud's container
        });
    
        // Clear the questionClouds array
        this.questionClouds.length = 0;
    }
    
    
    /**
     * This method is responsible for the creation of question clouds. As well as the monitoring of wether a question has been answered.
     * @param {array} cloudArray Expects to recieve the cloud array.
     */
    createQuestionClouds(cloudArray) {
        // Clear existing clouds
        cloudArray.forEach(cloud => cloud.container.destroy());
        cloudArray.length = 0;
    
        // Retrieve options
        const options = [App.mathsObjectArray[gameState.questionIndex]?.tans, App.mathsObjectArray[gameState.questionIndex]?.fans];
    
        // Randomly swap the options
        if (Math.random() < 0.5) {
            options.reverse();
        }
    
        const y = -400; // Adjust Y position as needed
    
        if (this.enemies.length) {
            const xMultiplier = 2; // Adjust this value to increase the spacing
    
            // Create clouds for each option
            options.forEach((option, i) => {
                this.questionAnswered = false;
                const cloud = new QuestionCloud(this.tileSize * xMultiplier * (i + 1), y, option);
                cloud.index = gameState.questionIndex;
                cloud.container.interactive = true;
                cloud.container.buttonMode = true;
                cloud.container.on('pointerdown', () => this.handleCloudSelection(option, cloud.index));
                this.container.addChild(cloud.container);
                cloudArray.push(cloud); // Add the new cloud to the array
            });
        }
    }
    
    
    /**
     * This method is called when you want to create an enemy.
     * @param {number} x Position of the enemy on the x axis.
     * @param {number} y Position of the enemy on the y axis.
     */
    createEnemy(x, y) {
            const enemy = new Enemy(x, y, this.container);
            this.container.addChild(enemy.sprite);
            enemy.createBody();
            this.enemies.push(enemy);
    }
    // [/10]
    /**
     * This method is responsible for the creation of the hero body using Matter.js.
     */
    createBody() {
        this.body = Matter.Bodies.rectangle(this.width / 2 + this.container.x, this.height / 2 + this.container.y, this.width, this.height, {friction: 0, isStatic: true});
        Matter.World.add(App.physics.world, this.body);
        this.body.gamePlatform = this;
    }

    /**
     * This method is responsible for the creation of the platform container, this is done using the PIXI.Container.
     * @param {number} x The position of the container on the x axis.
     */
    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = window.innerHeight - this.height;
    }



    /**
     * The createTiles method is responsible for creating a grid of tiles based on specified row and column counts. This operates by iterating over the number of rows and columns and creating individual tiles at each grid position.
     */
    createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }
        }
    }
    /**
     * This method is responsible for creating and positioning an individual tile within a grid, based on its row and column indices.
     * @param {number} row 
     * @param {number} col 
     */
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
        this.enemies.forEach(enemy => enemy.destroy());
        this.container.destroy();
    }
}