module.exports = function(){
    var eventDispatcher = {
        listeners: {},
        on: function (eventName, callback) {
            eventDispatcher.listeners[eventName] = eventDispatcher.listeners[eventName] || [];
            eventDispatcher.listeners[eventName].push(callback);
        },
        dispatchEvent: function (eventName, event) {
            if (eventDispatcher.listeners[eventName]) {
                _.each(eventDispatcher.listeners[eventName], function (listener) {
                    listener(event);
                });
            }
        },
        unsubscribe : function(eventName, callback){
            if (eventDispatcher.listeners[eventName]) {

            }

        }
    };
    return eventDispatcher;
}