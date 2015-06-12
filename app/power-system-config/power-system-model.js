module.exports = function(queue, uidFactory){

    queue.subscribe('reskja/validation-failure');

    var eventDispatcher = require('infrastructure/event-dispatcher')();

    var messageHandlers = {
        'validation-failure' : function(messageBody){
            if(me.sentCommands[messageBody.CommandId]){
                eventDispatcher.dispatchEvent('validation-failure', messageBody);
            } // else I ignore this message
        }
    };

    var me = {
        sentCommands: {},
        CreatePowerSystem : function(command){
            command.CommandId = uidFactory();
            me.sentCommands[command.CommandId] = command;
            queue.queueCommand('CreatePowerSystem', command);
        },
        AddPowerGenerationArea : function(command){
            command.CommandId = uidFactory();
            queue.queueCommand('AddPowerGenerationArea', command);
        },
        modelState : function(){
            return {
                name: 'Sláðu inn nafn',
                saved: false,
                areas:[
                    { name:"", saved:false, id:'new'}
                ]
            }
        },
        handleMessage: function(messageKey, messageBody){
            if(!messageHandlers[messageKey]){
                throw new Error("No message handler for [" + messageKey + "] in PowerSystemModel");
            }
            messageHandlers[messageKey](messageBody);
        },
        on : eventDispatcher.on
    };
    return me;
}