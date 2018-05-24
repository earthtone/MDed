/* Recipe: https://stackoverflow.com/questions/6984139/how-can-i-get-the-sha1-hash-of-a-string-in-node-js */

var crypto = require('crypto');

/**
 *	Create SHA1 Hash from Input
 *
 *	@function
 *	@param {*} input
 *	@return {String}
 *
 * */
function getSha(input) {
	return crypto
		.createHash('sha1')
		.update(JSON.stringify(input))
		.digest('hex');
}

module.exports = getSha;
