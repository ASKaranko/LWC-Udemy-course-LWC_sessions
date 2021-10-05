import { LightningElement, api } from 'lwc';

export default class MeetingRoom extends LightningElement {
    //@api можно установить значения только по default,
    //значения меняются только из parent компонента
    @api meetingRoomInfo;
    @api showRoomInfo = false;
}