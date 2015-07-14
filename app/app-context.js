var appContext =function() {

    var emptyCells = require('./empty-cells');

    var board = require('./board')(emptyCells(3,3));
    var boardViewComponent = require('./board-view');

    var cellViewComponent = require('./cell-view');

    var ApplicationRootView = boardViewComponent(board, cellViewComponent);

    return ApplicationRootView
};


module.exports = appContext;