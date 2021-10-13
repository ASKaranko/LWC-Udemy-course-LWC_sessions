({
    sendHandler: function(component, event, helper) {
        
    },
    messageHandler: function(component, event, helper) {
        if (event && event.getParam('message')) {
            const msg = event.getParam('message');
            const messages = component.get('v.messages');
            messages.push({
                id: messages.length,
                value: msg,
                from: 'LWC'
            });
            component.set('v.messages', messages);
        }
    },
})
