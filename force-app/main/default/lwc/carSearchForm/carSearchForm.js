import { LightningElement, wire, track } from 'lwc';
import getCarTypes from '@salesforce/apex/carSearchFormController.getCarTypes';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';

export default class CarSearchForm extends NavigationMixin(LightningElement) {
    @track carTypes;

    @wire(getCarTypes)
    wiredCarTypes({data, error}) {
        if (data) {
            this.carTypes = [{
                value: '',
                label: 'All Types',
            }]
            data.forEach(elem => {
                const carType = {};
                carType.label = elem.Name;
                carType.value = elem.Id;
                this.carTypes.push(carType);
            });
        } else if (error) {
            this.showToast('Error', error.body.message, 'error');
        }
    }

    carTypeChangeHandler(event) {
        const carTypeId = event.detail.value;
        const carTypeSelectionChangeEvent = new CustomEvent('cartypeselect', {detail: carTypeId});
        this.dispatchEvent(carTypeSelectionChangeEvent);
    }

    createNewCarType() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Car_Type__c',
                actionName: 'new'
            }
        });
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