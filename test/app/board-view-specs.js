describe('board view', function(){


    var emptyBoard = function(width, height){
        var board =[];
        function emptyRow(w){
            var r = [];
            while(w--) r[w] = 0;
            return r;
        }
        while(height--) board[height] = emptyRow(width);
        return board;
    };

    it('should render table with cell view per cell', function(){

        var CellView = require('test/fake-view');
        var boardView = require('board-view');

        var boardModelFactory = require('board');
        var board = boardModelFactory(emptyBoard(2,2));

        renderComponent(boardView(board, CellView));

        $('table.board').length.should.equal(1);
        $('div.mockdiv').length.should.equal(4);
    });
});
