import * as PIXI from "pixi.js";
import { App } from '../system/App';

export class Oracle {
    constructor() {
        this.app = App.app;
        this.image = App.sprite("oracle");

        this.chatContainer = new PIXI.Container();
        this.chatContainer.visible = false;
        this.app.stage.addChild(this.chatContainer);

        this.chatBackground = new PIXI.Graphics();
        this.chatBackground.beginFill(0xFFFFFF); // Background color
        this.chatBackground.drawRect(0, 0, 300, 300); // Adjust size
        this.chatBackground.endFill();
        this.chatContainer.addChild(this.chatBackground);

        this.oracleMessages = [
            "How's the game going!",
            "Think maths as your friend!",
            "Try using different techniques to solve the problem!",
            // Add more messages here...
        ];
    }

    addMessageToChat(message) {
        const style = new PIXI.TextStyle({
            fill: '#000000',
            fontSize: 16,
            wordWrap: true,
            wordWrapWidth: 280 // Adjust the width according to your design
        });

        const text = new PIXI.Text(message, style);
        text.x = 10; // Adjust horizontal positioning
        text.y = 10 + this.chatContainer.children.length * 25; // Adjust vertical positioning
        this.chatContainer.addChild(text);
    }

    onImageClick() {
        if (this.chatContainer.visible) {
            this.chatContainer.visible = false;
        } else {
            this.chatContainer.visible = true;
            this.chatContainer.x = this.image.x - this.chatContainer.width - 10; // Adjust position
            this.chatContainer.y = this.image.y - this.chatContainer.height;

            // adding random messages
            const randomIndex = Math.floor(Math.random() * this.oracleMessages.length);
            const randomMessage = this.oracleMessages[randomIndex];
            this.addMessageToChat("Oracle says: " + randomMessage);
        }
    }

    createImage(x, y, width, height) {
        this.image.interactive = true;
        this.image.buttonMode = true;
        this.image.x = x;
        this.image.y = y;
        this.image.width = width;
        this.image.height = height;
        this.image.on('pointerdown', this.onImageClick.bind(this));
        this.app.stage.addChild(this.image);
    }
}