var renderedProps = [];

module.exports = function () {
    var MockView = React.createClass({
        getInitialState: function(){
            renderedProps.push(this.props);
            return this.props;
        },
        render: function () {
            return (
                <div className="mockdiv">Mock View</div>
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
