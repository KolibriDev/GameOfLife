
var emptyCells = require('empty-cells');

describe('board view', function(){
    var CellView = require('test/fake-view');
    var boardView = require('board-view');


    describe('rendering', function(){
        var boardModelFactory = require('board');
        var Board = boardModelFactory(emptyCells(2,2));


        beforeEach(function(){
            renderComponent(boardView(Board, CellView));
        });

        it('should render table',function(){
            $('table.board').length.should.equal(1);
        });

        it('should render table with cell view per cell', function(){
            $('div.mockdiv').length.should.equal(4);
        });

        it('should render table row per row', function(){
            $('table tr').length.should.equal(2);
        });

    });

    describe('event handling', function(){

        it('should calculate next step on table click',function(){

            var stepRequested = false;

            var board = {
                cells: emptyCells(1,1),
                step: function(){
                    stepRequested = true;
                }
            };

            var BoardView = boardView(board, CellView);

            var attached = renderComponent(BoardView);

            /*
             var detached = ReactTestUtils.renderIntoDocument(React.createElement(BoardView, null));
             console.debug("detached", detached);
             */

            var table = ReactTestUtils.findRenderedComponentWithType(attached, BoardView);

            ReactTestUtils.Simulate.click(table.getDOMNode());

            table.should.be.ok;

            stepRequested.should.be.true;
        });

    })

});
