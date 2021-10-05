import { LightningElement } from 'lwc';

export default class ConditionalRenderingExample extends LightningElement {
    displayDiv = false;
    cityList = ['Donetsk', 'Kyiv', 'Lviv', 'Kharkiv'];

    showDivHandler(event) {
        this.displayDiv = event.target.checked;
    }
}