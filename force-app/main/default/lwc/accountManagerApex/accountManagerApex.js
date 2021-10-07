import { LightningElement, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountManager.getAccounts';

export default class AccountManagerApex extends LightningElement {
    // @wire(getAllAccounts)
    // accounts;

    numberOfRecords;
    accounts;

    get response() {
        if (this.accounts) {
            return true;
        }
        return false;
    }
    
    numberOfAccountsChangeHandler(event) {
        this.numberOfRecords = event.target.value;
    }

    getAccountsHandler() {
        if (this.numberOfRecords) {
            getAllAccounts({numberOfRecords: +this.numberOfRecords})
                .then(response => {
                    this.accounts = response;
                })
                .catch(error => {
                    console.log(error.body.message);
                })
        }
    }
}