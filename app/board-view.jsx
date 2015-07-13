module.exports = function (board, CellViewFactory) {
    return React.createClass({
        getInitialState: function () {
            return {};
        },
        componentWillUnmount: function(){
        },
        render: function () {
            var renderRows = function(){
                var rows = board.cells;
                var rowViews = _.map(rows, function(row, y){
                    var cellViews = _.map(row, function(cell, x ){
                        var CellView = CellViewFactory();
                        return (<CellView board={board} x={x} y={y}></CellView>)
                    });
                    return { cellViews };
                });
                return rowViews;
            };

            return (
                <table className="board">
                    { renderRows() }
                </table>
            );
        }
    });
};