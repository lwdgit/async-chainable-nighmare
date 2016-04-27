var asyncChainable = require('async-chainable');
var asyncChainableNightmare = require('..');
var expect = require('chai').expect;
var mlog = require('mocha-logger');

describe('async-chainable-nightmare - force .end() call', function() {
	it('should call .end()', function(finish) {
		this.timeout(30 * 1000);

		asyncChainable()
			.use(asyncChainableNightmare)
			.nightmare({show: true})
			.nightmareGoto('http://google.com')
			.then(function(cb) { mlog.log('Navigated'); cb() })
			.then(function(cb) { mlog.log('Force call to end()'); cb() })
			.nightmareEnd()
			.then(function(cb) { mlog.log('Ended'); cb() })
			.then(function(cb) { mlog.log('All done'); cb() })
			.end(function(err) {
				expect(err).to.be.not.ok;
				expect(this.nightmare).to.not.be.ok;
				finish();
			});
	});
});
