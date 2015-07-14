var emptyCells = function(width, height){
    var board =[];
    function emptyRow(w){
        var r = [];
        while(w--) r[w] = 0;
        return r;
    }
    while(height--) board[height] = emptyRow(width);
    return board;
};
module.exports = emptyCells;
