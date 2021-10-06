import { LightningElement, api, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class MeetingRoom extends LightningElement {
    //@api можно установить значения только по default,
    //значения меняются только из parent компонента
    @api meetingRoomInfo;
    @api showRoomInfo = false;

    @wire(CurrentPageReference) pageReference;

    tileClickHandler() {
        const tileClicked = new CustomEvent('tileclick', {detail: this.meetingRoomInfo, bubbles: true});
        this.dispatchEvent(tileClicked);
        fireEvent(this.pageReference, 'pubsubtileclick', this.meetingRoomInfo);
    }
}