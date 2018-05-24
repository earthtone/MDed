var firebase = require('firebase');

var config = {
	apiKey: 'AIzaSyDchy3v7SWNGLkvS2dbVYm2Bkicfiofh3s',
	authDomain: 'blargh-96e5b.firebaseapp.com',
	databaseURL: 'https://blargh-96e5b.firebaseio.com',
	projectId: 'blargh-96e5b',
	storageBucket: 'blargh-96e5b.appspot.com',
	messagingSenderId: '544805087316'
};

firebase.initializeApp(config);

exports.database = firebase.database();
exports.auth = firebase.auth();
exports.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
