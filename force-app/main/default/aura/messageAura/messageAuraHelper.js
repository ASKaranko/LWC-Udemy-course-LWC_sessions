({
    setMessages : function(component, msg, from) {
        const messages = component.get('v.messages');
        messages.push({
            id: messages.length,
            value: msg,
            from: from
        });
        component.set('v.messages', messages);
    }
})
