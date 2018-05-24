require('dotenv').config();

var firebase = require('firebase');

var config = {
	apiKey: process.env.API_KEY,
	databaseURL: process.env.AUTH_DOMAIN,
	projectId: process.env.DATABASE_URL,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

exports.database = firebase.database();
exports.auth = firebase.auth();
exports.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
