
window.expect = chai.expect;
window.should = chai.should;

console.debug('karma-launch', expect, should);

var newDiv = document.createElement("div"); 
newDiv.id="container";
document.body.appendChild(newDiv);

require('test/test-env').init();
