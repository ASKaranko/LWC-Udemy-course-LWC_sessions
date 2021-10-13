import { LightningElement, track, wire } from 'lwc';
import messageDemo from '@salesforce/messageChannel/messageDemo__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class MessageLWC extends LightningElement {
    @track messages = [];

    @wire(MessageContext)
    messageContext;

    sendHandler() {
        const inputElement = this.template.querySelector('lightning-input');
        if (inputElement) {
            const msg = inputElement.value;
            this.messages.push({
                id: this.messages.length,
                value: msg,
                from: 'LWC'
            });
            const messagePayload = {
                message: msg
            };
            publish(this.messageContext, messageDemo, messagePayload);
            inputElement.value = '';
        }
    }
}