import { LightningElement, api, track } from 'lwc';
import getExperiences from '@salesforce/apex/carExperiences.getExperiences';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CarExperiences extends NavigationMixin(LightningElement) {

    privateCarId;
    @track carExperiences = [];

    connectedCallback() {
        this.getCarExperiences();
    }

    @api
    get carId() {
        return this.privateCarId;
    }

    set carId(value) {
        this.privateCarId = value;
        this.getCarExperiences();
    }

    @api
    getCarExperiences() {
        getExperiences({carId: this.privateCarId})
            .then(experiences => {
                this.carExperiences = experiences;
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            })
    }

    userClickHandler(event) {
        const userId = event.target.getAttribute('data-userid');

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: userId,
                objectApiName: 'User',
                actionName: 'view'
            }
        });
    }

    get hasExperiences() {
        if (this.carExperiences.length > 0) {
            return true;
        }
        return false;
    }
     
    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title,
            message,
            variant,
        });
        this.dispatchEvent(evt);
    }

}