// var React          = require('react')
// var ReactAddons    = require('react/addons') // You also need to require the addons

var ReactTestUtils = React.addons.TestUtils;
var defaultProps = {};

var Hello = React.createClass({displayName: 'Hello',
    render: function() {
        return React.createElement("div", null, "Hello ", this.props.name);
    }
});

var Component = React.createClass(
    {
        displayName: 'Component',
        render: function() {
            return React.createElement("div", null, "Hello ", this.props.name);
        }
    }
);

function render(newProps, callback) {
    var props = _.merge(defaultProps, newProps);
    return React.render(
        React.createElement(Component, props), document.getElementById('container'), function () {
        if (typeof callback === 'function') setTimeout(callback)
    });
}


describe('Game of life board', function () {
    function emptyBoard() {
        return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }

    it('empty board should have no life cells', function(){
        var board = require('board')(emptyBoard());
        board.liveCellCount().should.equal(0);
    });


    it('next generation of an empty board is also empty',function(){
        var board = require('board')(emptyBoard());
        board.step().liveCellCount().should.equal(0);
    });

    it('should count live cells',function(){
        var initialBoard = emptyBoard();
        initialBoard[1]= [1,1,1];
        var board = require('board')(initialBoard);
        board.liveCellCount().should.equal(3);
    });

    it('cell with two neighbours should live on',function(){
        var initialBoard = emptyBoard();
        initialBoard[1]= [1,1,1];
        var board = require('board')(initialBoard);
        board.step().cell(1,1).should.equal(1);
    });

    it('cell with three neighbours should live on',function(){
        var initialBoard = emptyBoard();
        initialBoard[0]= [0,1,0];
        initialBoard[1]= [1,1,1];
        var board = require('board')(initialBoard);
        board.step().cell(1,1).should.equal(1);
    });

    it('cell with four neighbours should die',function(){
        var initialBoard = emptyBoard();
        initialBoard[0]= [0,1,1];
        initialBoard[1]= [1,1,1];
        var board = require('board')(initialBoard);
        board.step().cell(1,1).should.equal(0);
    });

    it('dead cell with exactly three neighbours should spring alive',function(){
        var initialBoard = emptyBoard();
        initialBoard[0]= [0,1,0];
        initialBoard[1]= [1,0,1];
        var board = require('board')(initialBoard);
        board.step().cell(1,1).should.equal(1);
    });

    it('should render output console.out',function(){
        var logStatements=[];
        var myConsole = {
            log : function(logStatement){
                logStatements.push(logStatement);
            }
        };
        var initialBoard = emptyBoard();
        initialBoard[0]= [0,1,0];
        initialBoard[1]= [1,1,1];
        var board = require('board')(initialBoard);
        board.step().writeToConsole(myConsole);

        logStatements[0].should.equal('1,1,1');
        logStatements[1].should.equal('1,1,1');
        logStatements[2].should.equal('0,1,0');
    });


});
