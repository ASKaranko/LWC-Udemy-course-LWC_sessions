import { LightningElement, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountManager.getAccounts';

export default class AccountManagerApex extends LightningElement {
    @wire(getAllAccounts)
    accounts;

    get response() {
        if (this.accounts) {
            return true;
        }
        return false;
    }
}