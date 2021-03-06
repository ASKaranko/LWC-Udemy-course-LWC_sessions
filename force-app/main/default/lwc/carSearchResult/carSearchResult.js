import { LightningElement, api, track, wire } from 'lwc';
import getCars from '@salesforce/apex/carSearchResultController.getCars';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CarSearchResult extends LightningElement {

    @api carTypeId;
    @track cars;
    selectedCarId;

    @wire(getCars, {carTypeId: '$carTypeId'})
    wiredCars({data, error}) {
        if (data) {
            this.cars = data;
        } else if (error) {
            this.showToast('Error', error.body.message, 'error');
        }
    }

    get carsFound() {
        if (this.cars) {
            return true;
        }
        return false;
    }

    carSelectHandler(event) {
        this.selectedCarId = event.detail;
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