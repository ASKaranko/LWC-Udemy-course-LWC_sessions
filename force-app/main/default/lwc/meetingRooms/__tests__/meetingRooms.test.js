import {createElement} from 'lwc';
import MeetingRooms from 'c/meetingRooms';

describe('c-meetingRooms', () => {

    afterEach(() => {
        while(document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Count of meeting rooms should be 7', () => {
        const meetingRooms = createElement('c-meetingRooms', {is: MeetingRooms});
        document.body.appendChild(meetingRooms);

        const allMeetingRoomComponents = meetingRooms.shadowRoot.querySelectorAll('c-meeting-room');
        debugger;
        expect(allMeetingRoomComponents.length).toBe(10);
    });

    it('Title should be Meeting Rooms', () => {
        const meetingRooms = createElement('c-meetingRooms', {is: MeetingRooms});
        document.body.appendChild(meetingRooms);

        const lightningCard = meetingRooms.shadowRoot.querySelector('lightning-card');
        debugger;
        expect(lightningCard.title).toBe('Meeting Rooms');
    });

}); 