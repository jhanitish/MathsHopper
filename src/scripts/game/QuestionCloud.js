import { App } from '../system/App';
import * as PIXI from "pixi.js";
import * as Matter from 'matter-js';
import { gameState } from '../system/gameState';

/**
 * This class is responsible for the creation of question clouds which display the options that the user can select.
 */

export class QuestionCloud {
    /**
     * 
     * @param {number} x The x parameter represents the horizontal position of the question clouds.
     * @param {number} y The y parameter represents the vertical position of the question clouds.
     * @param {number} optionText This is the value of the option that will be displayed in the cloud.
     */
    constructor(x, y, optionText) {
        this.optionText = optionText;
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = y;
        this.cloudSprites = []; // Initialize cloudSprites as an empty array
        this.currentOptionIndex = 0;
        this.createAndDisplayCloud(this.currentOptionIndex);
        App.app.stage.addChild(this.container);
    }

    /**
     * This function is responsible for shuffling the position of the options. Therefore the correct answer is not found in the same position each time.
     * @param {array} array This parameter takes an array of options.
     * @returns Returns a shuffled array.
     */

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * This function changes the colour of the question cloud.
     * @param {string} newColor This parameter expects a colour.
     */

    changeColor(newColor) {
        this.cloudSprites.forEach(cloudSpriteContainer => {
            // Assuming the cloud sprite is the first child of the container
            const cloudSprite = cloudSpriteContainer.children[0];
            cloudSprite.tint = newColor;
        });
    }
/**
 * This function is responsible for displaying the question clouds. The current setting returns two clouds each time, one cloud represents the false answer, the other will represent the correct answer.
 */
createAndDisplayCloud() {
    if (this.cloudSprites) {
        this.cloudSprites.forEach(cloud => cloud.destroy());
        this.cloudSprites = [];
    }

    // You can decide how to use the options, this is just an example
    const optionText = this.optionText;

    // Create and position a single cloud with the chosen option
    const cloud = this.createCloud(optionText, 0, 0);
    this.cloudSprites.push(cloud);
    this.container.addChild(cloud);

    // Update the current option index for the next call
    this.currentOptionIndex = (this.currentOptionIndex + 1) % 2;
}

/**
 * This method creates a cloud sprite uaing the App.sprite("cloud") and scales it. A new PIXI Container is created to group the cloud and its assocoiated text.
 * The PIXI Ticker's addOnce method os used to execute a block of code on the next frame with the updated cloud dimensions.
 * A PIXI Text object is created which dispalys the option text. Both the cloud and option text are added to the container and a Matter.js physics body is created for the cloud.
 * @param {number} optionText Represents the option text that will be displayed inside of the question cloud. 
 * @param {*} x The x parameter represents the horizontal position of the question clouds.
 * @param {*} y  y The y parameter represents the vertical position of the question clouds.
 * @returns Returns the container of the cloud.
 */
createCloud(optionText, x, y) {
    console.log({index:gameState.questionIndex});
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

/**
 * The destroy method is used to clean up resources and prevent memory leaks.
 */
    destroy() {
        // Clean up
        this.cloudSprites.forEach(cloud => {
            cloud.destroy();
        });
        this.container.destroy();
    }
}
