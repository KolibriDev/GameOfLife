module.exports = function (board) {
    return React.createClass({
        getInitialState: function () {
            return {};
        },
        componentWillUnmount: function(){
        },
        handleClick: function(){
            console.debug("Got click");

        },
        render: function () {
            return (
                <td className="dead" onClick={this.handleClick}>xX
                </td>
            );
        }
    });
};