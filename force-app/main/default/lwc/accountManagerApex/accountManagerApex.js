import { LightningElement, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountManager.getAccounts';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

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
                    const successEvent = new ShowToastEvent({
                        title: 'Accounts successfully loaded',
                        message: `${this.numberOfRecords} Accounts fetched from Salesforce database`,
                        variant: 'success',
                    });
                    this.dispatchEvent(successEvent);
                })
                .catch(error => {
                    const errorEvent = new ShowToastEvent({
                        title: 'Error in account fetching',
                        message: error.body.message,
                        variant: 'error',
                    });
                    this.dispatchEvent(errorEvent);
                })
        }
    }
}