import { LightningElement } from 'lwc';

export default class PublicMethodParent extends LightningElement {
    value;

    checkboxSelectHandler() {
        const childComponent = this.template.querySelector('c-public-method-child');
        const returnedMessage = childComponent.selectCheckbox(this.value);
        console.log('Returned message', returnedMessage);
    }

    changeInputHandler(event) {
        this.value = event.target.value;
    }

}