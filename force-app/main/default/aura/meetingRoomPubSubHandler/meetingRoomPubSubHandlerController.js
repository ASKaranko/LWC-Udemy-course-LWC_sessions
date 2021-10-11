({
    subscribeEvent : function(component, event, helper) {
        const pubSubModule = component.find('pubSubModule');
        const callbackFunction = $A.getCallback(function(payload) {
            component.set('v.selectedMeetingRoom', payload);
        });

        pubSubModule.registerListener('pubsubtileclick', callbackFunction);
    }
})
