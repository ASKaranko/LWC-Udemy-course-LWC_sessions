import { LightningElement } from 'lwc';

export default class CarSearch extends LightningElement {
    carTypeId;
    
    constructor() {
        super();
        this.carTypeId = '';
    }

    carTypeSelectHandler(event) {
        this.carTypeId = event.detail;
    }
}