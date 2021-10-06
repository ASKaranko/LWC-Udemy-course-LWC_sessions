import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class SelectedMeetingRoom extends LightningElement {
    @track selectedMeetingRoom = {
        roomName: '',
        roomCapacity: ''
    };

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('pubsubtileclick', this.meetingRoomSelectHandler, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    meetingRoomSelectHandler(payload) {
        this.selectedMeetingRoom = payload;
    }
}