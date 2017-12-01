const test = require('tape');
const randomHexValue = require('../lib/random-hex');

test('Random Hex Value Utility', function(assert){
	var actual = 9,
		expected = randomHexValue;

	assert.plan(4);

	assert.equal(expected(actual).length, actual, 'takes a length parameter and returns string of that length');
	
	actual = 3;
	assert.equal(expected(actual).length, actual, 'takes a length parameter and returns string of that length');

	actual = 27;
	assert.equal(expected(actual).length, actual, 'takes a length parameter and returns string of that length');

	actual = 18;
	expected = randomHexValue;
	assert.ok(expected(actual).match(/[\d|a-z|A-Z]/ig), 'returns a string of random letters and digits');

	assert.end();
});