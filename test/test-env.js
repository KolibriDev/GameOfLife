// This file will be automatically required when using `brunch test` command.

console.log('Registering test-env');
/*!
 * Provide check for fail function.
 */

var autoRequireTests = function () {
    var TEST_FINDER, mod, _i, _len, _ref, _results;
    TEST_FINDER = /-specs$/;
    _ref = window.require.list();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mod = _ref[_i];
        if (TEST_FINDER.test(mod)) {
            _results.push(require(mod));
        }
    }
      console.debug("results", _results);
    return _results;
};

module.exports = {
    // assert: chai.assert,
    expect: chai.expect,
    should: chai.should,
    // $: require('jquery'),
    err: function (fn, msg) {
        try {
            fn();
            throw new chai.AssertionError({message: 'Expected an error'});
        } catch (err) {
            chai.expect(err.message).to.equal(msg);
        }
    },
    init: function () {


        autoRequireTests();


        beforeEach(function(){
//            document.getElementById('container').innerHTML = "";
        });

        afterEach(function (done) {
            React.unmountComponentAtNode(document.getElementById('container'));

//  Uncomment next line to remove html rendered by last executed test.
//      document.getElementById('container').innerHTML = "";

            setTimeout(done)
        });


        window.renderComponent = function (ReactComponent, props) {
            var testElement = React.createElement(ReactComponent, props || null);
            return React.render(testElement, document.getElementById('container'));
        };

        window.ReactTestUtils = React.addons.TestUtils;

    }
};
