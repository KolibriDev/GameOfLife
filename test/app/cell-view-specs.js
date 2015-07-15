describe('cell view', function(){
    var CellView, broughtToLive;
    var fakeBoard = {
        onCellChange : function(){

        },
        bringToLive : function(){
            broughtToLive = true;
        }
    };

    var topElement;

    beforeEach(function(){
        CellView = require('cell-view')(fakeBoard);
        var cellElement = React.createElement(CellView, {x:0, y:0});
        var rowElement = React.createElement('tr', {}, [cellElement]);
        var tbodyElement = React.createElement('tbody', {}, [rowElement]);
        var tableElement = React.createElement('table', {}, [tbodyElement]);

        topElement =  React.render(tableElement, document.getElementById('container'));

        broughtToLive = false;
    });

    describe('rendering', function(){
        it('should render td for cell',function(){
            $('td').length.should.equal(1);
        });

        it('should put dead class on by default',function(){
            $('td.dead').length.should.equal(1);
        });
    });

    describe('user event handling', function(){

        it('click on td should bring cell to live',function(){
            var cell = ReactTestUtils.findRenderedComponentWithType(topElement, CellView);
            ReactTestUtils.Simulate.click(cell.getDOMNode());
            broughtToLive.should.be.ok;
        });

        it('drag over td with left button pressed should bring cell to live', function(){
            var cell = ReactTestUtils.findRenderedComponentWithType(topElement, CellView);
            ReactTestUtils.SimulateNative.mouseOver(cell.getDOMNode(), {buttons:1});
            broughtToLive.should.be.ok;
        });

        it('drag over td with left button depressed should not bring cell to live', function(){
            var cell = ReactTestUtils.findRenderedComponentWithType(topElement, CellView);
            ReactTestUtils.SimulateNative.mouseOver(cell.getDOMNode(), {buttons:0});
            broughtToLive.should.not.be.ok;
        })

    });
});