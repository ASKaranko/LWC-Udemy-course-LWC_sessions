import { LightningElement } from 'lwc';

export default class SimpleCalculator extends LightningElement {
    currentResult;
    firstNumber;
    secondNumber;
    previousResults = [];
    showPreviousResults = false;

    numberChangeHandler(event) {
        const inputBoxName = event.target.name;
        if (inputBoxName === 'firstNumber') {
            this.firstNumber = event.target.value;
        } else if (inputBoxName === 'secondNumber') {
            this.secondNumber = event.target.value;
        }
    }

    addHandler() {
        this.currentResult = `Result of ${+this.firstNumber} + ${+this.secondNumber} is ${+this.firstNumber + parseInt(this.secondNumber)}`;
        this.previousResults.push(this.currentResult);
    }

    subtractHandler() {
        this.currentResult = `Result of ${+this.firstNumber} - ${+this.secondNumber} is ${+this.firstNumber - parseInt(this.secondNumber)}`;
        this.previousResults.push(this.currentResult);
    }

    multiplyHandler() {
        this.currentResult = `Result of ${+this.firstNumber} * ${+this.secondNumber} is ${+this.firstNumber * parseInt(this.secondNumber)}`;
        this.previousResults.push(this.currentResult);
    }

    divideHandler() {
        this.currentResult = `Result of ${+this.firstNumber} / ${+this.secondNumber} is ${+this.firstNumber / parseInt(this.secondNumber)}`;
        this.previousResults.push(this.currentResult);
    }

    showPreviousResultsHandler(event) {
        this.showPreviousResults = event.target.checked;
    }

}