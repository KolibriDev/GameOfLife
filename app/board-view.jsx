module.exports = function (board, CellViewFactory) {

    console.debug("board", board);

    return React.createClass({
        getInitialState: function () {
            return {
                cells: board.cells
            };
        },
        componentWillUnmount: function(){
        },
        handleClick: function(){
            console.debug("table click.............");
            board.step();
        },
        render: function () {
            var renderRows = function(){
                var rows = board.cells;
                var rowViews = _.map(rows, function(row, y){
                    var cellViews = _.map(row, function(cell, x ){
                        var CellView = CellViewFactory(board);
                        return (<CellView board={board} x={x} y={y}></CellView>)
                    });
                    return (<tr>{ cellViews }</tr>);
                });
                return rowViews;
            };

            return (
                <table className="board" onClick={this.handleClick}>
                    { renderRows() }
                </table>
            );
        }
    });
};