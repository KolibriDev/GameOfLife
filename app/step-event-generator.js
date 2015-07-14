module.exports = function(){
    var _intervalMillis = 100;
    var _listeners = [];

    function generateStepEvent() {
        _.each(_listeners, function (listener) {
            listener();
        });
        repeatStep();
    }

    function repeatStep() {
        var timeout = window.setTimeout(function () {
            generateStepEvent();
        }, _intervalMillis);
        return timeout;
    }
    repeatStep();
    return {
        setInterval: function(intervalMillis){
            _intervalMillis=intervalMillis;
        },
        on: function(callback){
            _listeners.push(callback);
        }
    }
};