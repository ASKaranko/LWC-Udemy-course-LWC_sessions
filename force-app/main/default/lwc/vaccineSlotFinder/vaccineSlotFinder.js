import { LightningElement, track } from 'lwc';

export default class VaccineSlotFinder extends LightningElement {

    @track centers = [];
    @track dates = [];
    pincode = '';

    async fetchVaccineSlots() {
        const today = new Date();
        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        const endPointUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${this.pincode}&date=${formattedDate}`;
        const vaccineSlotResponse = await fetch(endPointUrl, {
            method: 'GET',
        });
        const slotsData = await vaccineSlotResponse.json();
        this.buildColumnsAndRows(slotsData.centers);
    }
    
    buildColumnsAndRows(data) {
        const dates = new Map();
        dates.set('name', {label: 'Center Name', fieldName: 'name', type: 'text', wrapText: true});

        const centers = new Map();
        for (let center of data) {
           !centers.has(center.center_id) && centers.set(center.center_id, {name: center.name, });

            center.sessions.forEach(session => {
                // destructuring with renaming variables
                const {date, available_capacity: capacity, min_age_limit: ageLimit} = session;
                dates.set(date, {label: date, fieldName: date, type: 'text', wrapText: true, cellAttributes: {
                    class: {fieldName: 'className'}
                }});

                centers.get(center.center_id)[date] = `Available capacity: ${capacity}
                    Min Age: ${ageLimit}`;
                centers.get(center.center_id)['className'] = capacity > 0 
                    ? 'slds-text-color_success'
                    : 'slds-text-color_error';
            });
        }
        this.dates = Array.from(dates.values());
        this.centers = Array.from(centers.values());
    }

    get hideMessage() {
        return this.centers.length > 0;
    }

    pincodeChangeHandler(event) {
        this.pincode = event.target.value;
        const isEnterKey = event.keyCode === 13;
        isEnterKey && this.pincode.length === 6 && this.fetchVaccineSlots();
    }
}