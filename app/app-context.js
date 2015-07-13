var appContext =function() {

    var board = require('./board');
    var boardViewComponent = require('./board-view');

    var ApplicationRootView = boardViewComponent(board);

    return ApplicationRootView
};


module.exports = appContext;