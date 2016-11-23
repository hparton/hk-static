var ncp = require('ncp').ncp;
var exec = require("child_process").exec;

var static = function () {
	ncp(__dirname + '/source', process.cwd(), function (err) {
		if (err) {
			return console.error(err);
		}

		console.log('~ '.yellow + 'Installing dependencies... this may take a minute.')

		exec('npm install', function (err) {
	        console.log('✔ '.green + 'Done! use \'npm run dev\' to get started');
	     });
	})
}

module.exports = static;