var latestGeneration;

var boardConstructor = function(cells, cellChangeListeners){

    function initCellChangeListeners(){
        var result = _.map(cells, function(row){
            return _.map(row, function(cell){
                return [];
            })
        });
        return result;
    }
    var _cellChangeListeners = cellChangeListeners || initCellChangeListeners();

    function notifyCellChange(x, y, oldState, newState){
        var listeners = _cellChangeListeners[y][x];
        _.each(listeners, function(listener){
            listener(oldState, newState);
        })
    }

    function liveNeighbours(i, j) {
        var result = 0;
        _.each([-1,0,1], function(x){
            _.each([-1,0,1], function(y){
                if(x===0 && y===0) return;
                result += board.cell(i+x,j+y);
            })
        });
        return result;
    }

    var board = {
        liveCellCount: function () {
            return _.reduce(cells, function (mem, row) {
                return mem + _.reduce(row, function (rmem, cell) {
                        return rmem + cell;
                    }, 0);
            }, 0);
        },
        step: function () {
            var nextGenerationCells = JSON.parse(JSON.stringify(latestGeneration.cells));
            _.each(latestGeneration.cells, function (row, y) {
                _.each(row, function (cell, x) {
                    var neigbourCount = liveNeighbours(x, y);
                    if (cell) {
                        nextGenerationCells[y][x] = Number(neigbourCount === 2 || neigbourCount === 3);

                        if(!nextGenerationCells[y][x]){
                            notifyCellChange(x, y, cell, nextGenerationCells[y][x]);
                        }
                    } else{
                        if( neigbourCount === 3){
                            nextGenerationCells[y][x] = 1;
                            notifyCellChange(x, y, cell, nextGenerationCells[y][x]);
                        }
                    }
                })

            });
            cells = nextGenerationCells;
            latestGeneration = boardConstructor(nextGenerationCells, _cellChangeListeners);
            board.step = latestGeneration.step;
            return latestGeneration
        },
        cell: function (x, y) {
            if(x<0 || y < 0){
                return 0;
            }
            if(y>=latestGeneration.cells.length || x >= latestGeneration.cells[0].length){
                return 0;
            }
            return latestGeneration.cells[y][x];
        },
        writeToConsole : function(console){
            _.each(latestGeneration.cells, function(row){
                console.log(row.join(","));
            })
        },
        onCellChange: function(x,y, callback){
            _cellChangeListeners[y][x].push(callback);
        },
        bringToLive : function(x, y){
            console.debug("bring to live x, y", x, y);
            var previousState = latestGeneration.cells[y][x];
            latestGeneration.cells[y][x] = 1;
            notifyCellChange(x, y, previousState, latestGeneration.cells[y][x] );

        },
        cells: cells
    };
    latestGeneration = board;
    return board
};

module.exports = boardConstructor;
