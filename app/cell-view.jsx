module.exports = function (board) {
    return React.createClass({
        getInitialState: function () {
            var me = this;
            board.onCellChange(this.props.x, this.props.y, function(oldState, newState){
                me.setState({
                    alive:newState
                });
            });

            return {
                alive:0
            };
        },
        componentWillUnmount: function(){
        },
        handleClick: function(){
            board.bringToLive(this.props.x, this.props.y);
        },
        handleMouseOver: function(eventData){
            if(eventData.buttons===1){
                console.debug("left button down...");
                board.bringToLive(this.props.x, this.props.y);
            }
        },
        render: function () {
            var stateClass = this.state.alive?'alive':'dead';
            return (
                <td className={stateClass} onMouseOver={this.handleMouseOver} onClick={this.handleClick}>{this.state.alive}
                </td>
            );
        }
    });
};