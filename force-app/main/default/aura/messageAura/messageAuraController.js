({
    sendHandler: function(component, event, helper) {
        const inputElement = component.find('inputBox');
        if (inputElement) {
            const msg = inputElement.get('v.value');
            helper.setMessages(component, msg, 'Aura');
            const messagePayload = {
                message: msg,
                from: 'Aura'
            };
            const msgChannel = component.find('messageChannel')
            msgChannel.publish(messagePayload);
            inputElement.set('v.value', '');
        }
    },
    messageHandler: function(component, event, helper) {
        if (event && event.getParam('message') && event.getParam('from') !== 'Aura') {
            const msg = event.getParam('message');
            helper.setMessages(component, msg, 'LWC');
        }
    },
})
