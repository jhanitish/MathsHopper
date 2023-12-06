import { App } from '../system/App';
import * as PIXI from "pixi.js";
import * as Matter from 'matter-js';
import { gameState } from '../system/gameState';

export class QuestionCloud {
    constructor(x, y, option1, option2) {
        this.option1 = option1; // Array of option texts
        this.container = new PIXI.Container();
        this.option2 = option2;
        this.container.x = x;
        this.container.y = y;
        this.cloudSprites = []; // Initialize cloudSprites as an empty array
        this.currentOptionIndex = 0;
        this.createAndDisplayCloud(this.currentOptionIndex);
        App.app.stage.addChild(this.container);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    changeColor(newColor) {
        this.cloudSprites.forEach(cloud => {
            cloud.tint = newColor;
        });
    }

createAndDisplayCloud() {
    if (this.cloudSprites) {
        this.cloudSprites.forEach(cloud => cloud.destroy());
        this.cloudSprites = [];
    }

    // You can decide how to use the options, this is just an example
    const optionText = this.currentOptionIndex === 0 ? this.option1 : this.option2;

    // Create and position a single cloud with the chosen option
    const cloud = this.createCloud(optionText, 0, 0);
    this.cloudSprites.push(cloud);
    this.container.addChild(cloud);

    // Update the current option index for the next call
    this.currentOptionIndex = (this.currentOptionIndex + 1) % 2;
}


createCloud(optionText, x, y) {
    const cloud = App.sprite("cloud");
    const scale = 0.1;
    cloud.scale.set(scale, scale);

    // Create a container to hold the cloud and text
    const container = new PIXI.Container();

    // Wait for the next frame to ensure the cloud's width and height are updated
    PIXI.Ticker.shared.addOnce(() => {
        const text = new PIXI.Text(optionText, {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 'black',
            align: 'center'
        });

        text.anchor.set(0.5); // Center the text
        text.x = cloud.width / 2; // Position text at the center of the cloud horizontally
        text.y = cloud.height / 2; // Position text at the center of the cloud vertically

        container.addChild(cloud, text); // Add cloud and text to the container

        // Correctly calculate the position and size of the cloud's physics body
        let cloudBodyX = x + (cloud.width * scale) / 2;
        let cloudBodyY = y + (cloud.height * scale) / 2;
        let cloudBodyWidth = cloud.width * scale;
        let cloudBodyHeight = cloud.height * scale;

        // Create a Matter.js body for the cloud
        let cloudBody = Matter.Bodies.rectangle(
            cloudBodyX, cloudBodyY, cloudBodyWidth, cloudBodyHeight,
            { isSensor: true, label: 'cloud', cloudOption: optionText }
        );
        cloudBody.gameCloud = cloud; // Link the cloud sprite with its physics body
        Matter.World.add(App.physics.world, cloudBody);
    });

    container.x = x; 
    container.y = y; 
    return container;
}

    destroy() {
        // Clean up
        this.cloudSprites.forEach(cloud => {
            cloud.destroy();
        });
        this.container.destroy();
    }
}
