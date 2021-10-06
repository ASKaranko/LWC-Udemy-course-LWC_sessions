import { LightningElement, api } from 'lwc';

export default class PublicMethodChild extends LightningElement {
    value = ['red'];

    options = [
        { label: 'Red marker', value: 'red' },
        { label: 'Blue marker', value: 'blue' },
        { label: 'Green marker', value: 'green' },
        { label: 'Tomato marker', value: 'tomato' }
    ];

    @api
    selectCheckbox(checkboxValue) {
        const selectedCheckbox = this.options.find(checkbox => checkboxValue === checkbox.value);
        if (selectedCheckbox) {
            this.value = checkboxValue;
            return 'Successfully checked';
        }
        return 'No checkbox found';
    }
}