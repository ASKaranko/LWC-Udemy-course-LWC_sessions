import { LightningElement } from 'lwc';

export default class MeetingRooms extends LightningElement {
    selectedMeetingRoom;

    constructor() {
        super();
        this.template.addEventListener('tileclick', this.tileSelectHandler.bind(this));
    }

    meetingRoomsInfo = [
        {roomName: 'A-01', roomCapacity: '13'},
        {roomName: 'A-02', roomCapacity: '17'},
        {roomName: 'A-03', roomCapacity: '17'},
        {roomName: 'A-04', roomCapacity: '17'},
        {roomName: 'A-05', roomCapacity: '21'},
        {roomName: 'A-06', roomCapacity: '17'},
        {roomName: 'A-07', roomCapacity: '13'},
        {roomName: 'A-08', roomCapacity: '27'},
        {roomName: 'A-09', roomCapacity: '30'},
        {roomName: 'A-10', roomCapacity: '30'}
    ];

    tileSelectHandler(event) {
        const meetingRoomInfo = event.detail;
        this.selectedMeetingRoom = meetingRoomInfo.roomName;
    }
}