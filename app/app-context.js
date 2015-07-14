var appContext =function() {

    var tickEventGenerator = require('./step-event-generator')();

    var emptyCells = require('./empty-cells');

    var cells = emptyCells(10, 10);
    cells[1] = [1,1,1,1,1,1,1,1,1,1];
    var board = require('./board')(cells);

    var boardViewComponent = require('./board-view');

    var cellViewComponent = require('./cell-view');

    var ApplicationRootView = boardViewComponent(board, cellViewComponent);

    tickEventGenerator.on(board.step);

    return ApplicationRootView
};


module.exports = appContext;