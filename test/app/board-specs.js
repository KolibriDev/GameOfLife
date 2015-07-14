
describe('Game of life board', function () {
    function empty3by3cells() {
        return [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }

    it('empty board should have no life cells', function(){
        var board = require('board')(empty3by3cells());
        board.liveCellCount().should.equal(0);
    });


    it('next generation of an empty board is also empty',function(){
        var board = require('board')(empty3by3cells());
        board.step().liveCellCount().should.equal(0);
    });

    it('should count live cells',function(){
        var initialBoard = empty3by3cells();
        initialBoard[1]= [1,1,1];
        var board = require('board')(initialBoard);
        board.liveCellCount().should.equal(3);
    });

    it('cell with two neighbours should live on',function(){
        var initialBoard = empty3by3cells();
        initialBoard[1]= [1,1,1];
        var board = require('board')(initialBoard);
        board.step().cell(1,1).should.equal(1);
    });

    it('cell with three neighbours should live on',function(){
        var initialBoard = empty3by3cells();
        initialBoard[0]= [0,1,0];
        initialBoard[1]= [1,1,1];
        var board = require('board')(initialBoard);
        board.step().cell(1,1).should.equal(1);
    });

    it('cell with four neighbours should die',function(){
        var initialBoard = empty3by3cells();
        initialBoard[0]= [0,1,1];
        initialBoard[1]= [1,1,1];
        var board = require('board')(initialBoard);
        board.step().cell(1,1).should.equal(0);
    });

    it('dead cell with exactly three neighbours should spring alive',function(){
        var initialBoard = empty3by3cells();
        initialBoard[0]= [0,1,0];
        initialBoard[1]= [1,0,1];
        var board = require('board')(initialBoard);
        board.step().cell(1,1).should.equal(1);
    });


    it('step should mutate state of board object',function(){
        var initialBoard = empty3by3cells();
        initialBoard[0]= [0,1,0];
        initialBoard[1]= [1,0,1];
        var board = require('board')(initialBoard);
        board.step();
        board.cell(1,1).should.equal(1);
    });


    it('should render output console.out',function(){
        var logStatements=[];
        var myConsole = {
            log : function(logStatement){
                logStatements.push(logStatement);
            }
        };
        var initialBoard = empty3by3cells();
        initialBoard[0]= [0,1,0];
        initialBoard[1]= [1,1,1];
        var board = require('board')(initialBoard);
        board.step().writeToConsole(console);
console.debug("------");
        board.writeToConsole(console);

        board.writeToConsole(myConsole);

        logStatements[0].should.equal('1,1,1');
        logStatements[1].should.equal('1,1,1');
        logStatements[2].should.equal('0,1,0');
    });


    it('should bring cell to live one',function(){
        var logStatements=[];
        var myConsole = {
            log : function(logStatement){
                logStatements.push(logStatement);
            }
        };
        var initialBoard = empty3by3cells();
        initialBoard[0]= [0,1,0];
        initialBoard[1]= [1,1,1];
        var board = require('board')(initialBoard);
        board.step();

        board.bringToLive(2,2);

        board.writeToConsole(myConsole);

        logStatements[0].should.equal('1,1,1');
        logStatements[1].should.equal('1,1,1');
        logStatements[2].should.equal('0,1,1');
    });


    it('should bring cell to live and factor into next gen',function(){
        var logStatements=[];
        var myConsole = {
            log : function(logStatement){
                logStatements.push(logStatement);
            }
        };
        var initialBoard = empty3by3cells();
        initialBoard[0]= [0,1,0];
        initialBoard[1]= [1,1,1];
        var board = require('board')(initialBoard);
        board.step();

        board.bringToLive(2,0);
        board.bringToLive(2,2);

        board.step();
        logStatements.length=0;
        board.writeToConsole(myConsole);


        logStatements[0].should.equal('1,0,1');
        logStatements[1].should.equal('0,0,0');
        logStatements[2].should.equal('1,0,1');

    });



    it('should send event when cell state changes',function(){
        var logStatements=[];
        var myConsole = {
            log : function(logStatement){
                logStatements.push(logStatement);
            }
        };
        var initialCells = empty3by3cells();
        initialCells[0]= [0,1,0];
        initialCells[1]= [1,1,1];
        var board = require('board')(initialCells), twoTwo=0, zeroZero=0;

        board.onCellChange(0,0, function(oldCellState, newCellState){
            zeroZero = newCellState;
        });
        board.onCellChange(2,2, function(oldCellState, newCellState){
            expect.fail('Should not get an event on cell 2,2')
        });
        board.step();

        zeroZero.should.equal(1);
        twoTwo.should.equal(0);
    });


});
