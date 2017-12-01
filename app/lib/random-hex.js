const crypto  = require('crypto');

module.exports = function randomHexValue(ln){
	return crypto.randomBytes(Math.ceil(ln/2)).toString('hex').slice(0, ln);
};