import { LightningElement, track } from 'lwc';

export default class BMICalculator extends LightningElement {
    cardTitle = 'BMI Calculator';
    @track bmiData = {
        weight: 0,
        height: 0,
        result: 0,
    }
    
    weightChangeHandler(event) {
        this.bmiData.weight = +event.target.value;
    }

    heightChangeHandler(event) {
        this.bmiData.height = +event.target.value;
    }

    calculateBMIHandler() {
        this.bmiData.result = this.bmiData.weight /(this.bmiData.height * this.bmiData.height);
    }

    get bmiResult() {
        return `Your BMI is: ${this.bmiData.result}`;
    }
}