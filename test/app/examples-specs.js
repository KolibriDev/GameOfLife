// var React          = require('react')
// var ReactAddons    = require('react/addons') // You also need to require the addons

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

