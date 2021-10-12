import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import NAME_FIELD from '@salesforce/schema/Car_Experience__c.Name';
import EXPERIENCE_FIELD from '@salesforce/schema/Car_Experience__c.Experience__c';
import CAR_FIELD from '@salesforce/schema/Car_Experience__c.Car__c';
import EXPERIENCE_OBJECT from '@salesforce/schema/Car_Experience__c'

export default class AddCarExperience extends LightningElement {
    expTitle = '';
    expDescription = '';
    
    @api carId;

    titleChangeHandler(event) {
        this.expTitle = event.target.value;
    }

    descriptionChangeHandler(event) {
        this.expDescription = event.target.value;
    }

    addExperienceHandler() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.expTitle;
        fields[EXPERIENCE_FIELD.fieldApiName] = this.expDescription;
        fields[CAR_FIELD.fieldApiName] = this.carId;

        const recordInput = {
            apiName: EXPERIENCE_OBJECT.objectApiName,
            fields
        }

        createRecord(recordInput)
            .then(carExperience => {
                this.showToast('Success', 'Experience Record Updated', 'success');
                const recordAdded = new CustomEvent('experienceadded');
                this.dispatchEvent(recordAdded);
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
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