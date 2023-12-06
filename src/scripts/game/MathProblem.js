import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { gameState } from "../system/gameState";

export class MathProblem {
    constructor() {
        this.container = new PIXI.Container();
        this.generateAdditionProblem();
    }

    clearQuestion() {
        if (this.questionText) {
            this.container.removeChild(this.questionText);
            this.questionText.destroy();
            this.questionText = null;
        }
    }

    generateAdditionProblem() {
        this.clearQuestion();
        const problem = this.createAdditionProblem();
        // Assign the new PIXI.Text to this.questionText
        this.questionText = new PIXI.Text(problem.question, {/* Styling Options */});
        this.container.addChild(this.questionText);
        this.currentProblem = problem;
    }

    generateSubtractionProblem() {
        this.clearQuestion();
        const problem = this.createSubtractionProblem();
        // Assign the new PIXI.Text to this.questionText
        this.questionText = new PIXI.Text(problem.question, {/* Styling Options */});
        this.container.addChild(this.questionText);
        this.currentProblem = problem;
    }

    generateMultiplicationProblem() {
        this.clearQuestion();
        const problem = this.createMultiplicationProblem();
        // Assign the new PIXI.Text to this.questionText
        this.questionText = new PIXI.Text(problem.question, {/* Styling Options */});
        this.container.addChild(this.questionText);
        this.currentProblem = problem;
    }

    generateDivisionProblem() {
        this.clearQuestion();
        const problem = this.createDivisionProblem();
        // Assign the new PIXI.Text to this.questionText
        this.questionText = new PIXI.Text(problem.question, {/* Styling Options */});
        this.container.addChild(this.questionText);
        this.currentProblem = problem;
    }

    refreshProblem() {
        // Example: Randomly choose a type of problem to refresh
        switch (gameState.difficulty) {
            case "Addition": 
                this.generateAdditionProblem();
                this.displayAnswers()
                break;
            case "Subtraction":
                this.generateSubtractionProblem();
                this.displayAnswers()
                break;
            case "Division":
                this.generateMultiplicationProblem();
                this.displayAnswers()
                break;
            case "Multiplication":
                this.generateDivisionProblem();
                this.displayAnswers()
                break;
        }
    }

    createAdditionProblem() {
        // Example: Simple addition problem
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        return {
            question: `${num1} + ${num2}`,
            answer: num1 + num2
        };
    }

    createDivisionProblem() {
        // Example: Simple addition problem
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        return {
            question: `${num1} / ${num2}`,
            answer: num1 / num2
        };
    }

    createSubtractionProblem() {
        // Example: Simple addition problem
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        return {
            question: `${num1} - ${num2}`,
            answer: num1 - num2
        };
    }

    createMultiplicationProblem() {
        // Example: Simple addition problem
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        return {
            question: `${num1} * ${num2}`,
            answer: num1 * num2
        };
    }

    checkAnswer(userAnswer) {
        return userAnswer === this.currentProblem.answer;
    }

    displayAnswers() {
        let falseAnswer;
        do {
            falseAnswer = Math.floor(Math.random() * 10);
        } while (falseAnswer === this.currentProblem.answer);
        return {
            answer: this.currentProblem?.answer,
            falseAnswer: falseAnswer
        };
    }

    update() {
        // Update logic for the math problem, if needed
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        return {
            question: `${num1} + ${num2}`,
            answer: num1 + num2
        };
    }

    destroy() {
        this.container.destroy();
    }

    congradulations(){
        this.questionText2 = new PIXI.Text("Congradulations you pased this round", {/* Styling Options */});
        this.container.addChild(this.questionText2);
        // Clear and remove the input field
    }
}
