import { LightningElement, api, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class CarTile extends LightningElement {
    @api car;
    @api carSelectedId;

    @wire(CurrentPageReference)
    pageRef;

    carSelectHandler(event) {
        event.preventDefault();
        const carId = this.car.Id;
        const carSelect = new CustomEvent('carselect', {detail: carId});
        this.dispatchEvent(carSelect);

        fireEvent(this.pageRef, 'carselect', this.car.Id);
    }

    get isCarSelected() {
        if(this.car.Id === this.carSelectedId) {
            return 'tile selected';
        }
        return 'tile';
    }
}