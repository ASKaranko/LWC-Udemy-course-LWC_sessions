import { LightningElement, track, wire } from 'lwc';
import messageDemo from '@salesforce/messageChannel/messageDemo__c';
import { 
    publish, 
    MessageContext, 
    subscribe, 
    unsubscribe, 
    APPLICATION_SCOPE } from 'lightning/messageService';
import hasSendPermission from '@salesforce/customPermission/Send_Message';
export default class MessageLWC extends LightningElement {
    @track messages = [];
    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        if (!this.subscription) {
            this.subscription = subscribe(this.messageContext, messageDemo, (payload) => {
                this.messageHandler(payload);
            }, {scope: APPLICATION_SCOPE});
        }
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

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
                message: msg,
                from: 'LWC'
            };
            publish(this.messageContext, messageDemo, messagePayload);
            inputElement.value = '';
        }
    }

    messageHandler(message) {
        if (message && message.from !== 'LWC') {
            this.messages.push({
                id: this.messages.length,
                value: message.message,
                from: 'Aura'
            });
        }
    }

    get disableSendButton() {
        return !hasSendPermission;
    }
}