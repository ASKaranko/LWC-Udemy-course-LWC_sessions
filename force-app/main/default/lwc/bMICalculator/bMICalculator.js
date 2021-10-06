import { LightningElement, track } from 'lwc';
import {getBMI} from 'c/bmi';

export default class BMICalculator extends LightningElement {
    cardTitle = 'BMI Calculator in Dev Server';
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
        //this.bmiData.result = this.bmiData.weight /(this.bmiData.height * this.bmiData.height);
        this.bmiData.result = getBMI(this.bmiData);
    }

    get bmiResult() {
        return `Your BMI is: ${this.bmiData.result}`;
    }
}