import { LightningElement } from 'lwc';

export default class AccountManagerLDSForms extends LightningElement {
    recordId;
    
    successHandler(event) {
        this.recordId = event.detail.id;
    }
}