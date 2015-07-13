var renderedProps = [];

module.exports = function () {
    var args = JSON.stringify(arguments);

    var MockView = React.createClass({
        getInitialState: function(){
            renderedProps.push(this.props);
            return this.props;
        },
        render: function () {
            var props = JSON.stringify(this.props);

            return (
                <div className="mockdiv">Mock View { args } props {props} </div>
            );
        }
    });
    return MockView
};

module.exports.props = function(idx){
    return renderedProps[idx];
};

module.exports.reset = function(idx){
    renderedProps = [];
};
