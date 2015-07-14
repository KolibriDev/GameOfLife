describe('cell view', function(){
    var CellView;
    var fakeBoard = {};
    var topElement;

    beforeEach(function(){
        CellView = require('cell-view')(fakeBoard);
        var cellElement = React.createElement(CellView, {x:0, y:0});
        var rowElement = React.createElement('tr', {}, [cellElement]);
        var tbodyElement = React.createElement('tbody', {}, [rowElement]);
        var tableElement = React.createElement('table', {}, [tbodyElement]);

        topElement =  React.render(tableElement, document.getElementById('container'));
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

        it('should get click on td',function(){
            var cell = ReactTestUtils.findRenderedComponentWithType(topElement, CellView);

            console.debug("Clicking....", cell.getDOMNode());

            ReactTestUtils.Simulate.click(cell.getDOMNode());

            console.debug("DONE clicking...");

            cell.should.be.ok;

        });

    });
});