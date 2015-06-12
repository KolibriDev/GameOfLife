var boardConstructor = function(cells){

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
            var nextGenerationCells = JSON.parse(JSON.stringify(cells));
            _.each(cells, function (row, i) {
                _.each(row, function (cell, j) {
                    var neigbourCount = liveNeighbours(i, j);
                    if (cell) {
                        nextGenerationCells[i][j] = Number(neigbourCount === 2 || neigbourCount === 3);
                    } else{

                        if( neigbourCount === 3){
                            nextGenerationCells[i][j] = 1;
                        }

                    }
                })

            });
            return boardConstructor(nextGenerationCells)
        },
        cell: function (i, j) {
            if(i<0 || j < 0){
                return 0;
            }
            if(i>=cells.length || j >= cells[0].length){
                return 0;
            }
            return cells[i][j];
        },
        writeToConsole : function(console){
            _.each(cells, function(row){
                console.log(row.join(","));
            })
        }
    };
    return board
};

module.exports = boardConstructor;
