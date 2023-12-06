import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';
import { gameState } from '../system/gameState';

export class Diamond {
    constructor(x, y, container) {
        this.createSprite(x, y);
        App.app.ticker.add(this.update, this);
        this.container = container;
        this.popoverContainer = this.createPopover();
    }

    createSprite(x, y) {
        this.sprite = App.sprite("diamond");
        this.sprite.x = x;
        this.sprite.y = y;
    }

    createPopover() {
        // Create a popover container
        const popoverContainer = new PIXI.Container();
        popoverContainer.position.set(this.sprite.x, this.sprite.y - this.sprite.height); // Position the popover above the sprite
        this.container.addChild(popoverContainer);

        // Create popover background
        const popoverBackground = new PIXI.Graphics();
        popoverBackground.beginFill(0xFFFFFF); // Set popover background color
        popoverBackground.drawRect(0, 0, 150, 80); // Adjust width and height of the popover
        popoverBackground.endFill();
        popoverContainer.addChild(popoverBackground);

        // Create text for the popover
        const textContent = App.mathsObjectArray[gameState.questionIndex].exp; // Replace with your desired text
        const textStyle = {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 'black', // Set text color
            wordWrap: true,
            wordWrapWidth: 140, // Set the width for word wrap
        };
        const popoverText = new PIXI.Text(textContent, textStyle);
        popoverText.position.set(10, 10); // Set the position of the text inside the popover
        popoverContainer.addChild(popoverText);

        // Update popover position when the sprite's position changes
        // App.app.ticker.add(() => {
        //     popoverContainer.position.set(this.sprite.x, this.sprite.y - this.sprite.height);
        // });
        this.popoverTicker = () => {
            if (popoverContainer && this.sprite) {
              popoverContainer.position.set(this.sprite.x, this.sprite.y - this.sprite.height);
            }
        };
        App.app.ticker.add(this.popoverTicker);

        // Make the popover always visible
        popoverContainer.visible = true;
    }

    update() {
        if (this.body && this.sprite) {
            // Update sprite position to match the physics body
            this.sprite.x = this.body.position.x - this.sprite.width / 2;
            this.sprite.y = this.body.position.y - this.sprite.height / 2;
        }
    }

    startFalling() {
        // Make the body non-static so it can fall
        Matter.Body.setStatic(this.body, false);
    
        // Optional: apply a small initial force
        Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -0.02 });
    }
    
    createBody() {
        this.body = Matter.Bodies.rectangle(
            this.sprite.width / 2 + this.sprite.x,
            this.sprite.height / 2 + this.sprite.y,
            this.sprite.width,
            this.sprite.height,
            {
                friction: 0,
                isStatic: true,  // Make the body non-static
                render: { fillStyle: '#060a19' }
            }
        );
        this.body.isSensor = true;
        this.body.gameDiamond = this;
        Matter.World.add(App.physics.world, this.body);
    }

    // [14]
    destroy() {
        if (this.sprite) {
            App.app.ticker.remove(this.update, this);
            Matter.World.remove(App.physics.world, this.body);
            // Destroy the sprite
            this.container.removeChild(this.sprite);
            this.sprite.destroy({ children: true });
            this.sprite = null;
        }

        // Stop updating popover position if ticker function exists
        if (this.popoverTicker) {
            App.app.ticker.remove(this.popoverTicker);
            this.popoverTicker = null;
        }

        if (this.popoverContainer) {
            this.container.removeChild(this.popoverContainer);
            this.popoverContainer.destroy({ children: true });
            this.popoverContainer = null;
        }
    }
}