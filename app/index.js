import './main.scss';
var sub = require('./sub');
var $ = require('jquery');
var moment = require('moment');

import './plugin.js'

var app = document.createElement('div');
let myPromise = Promise.resolve()

app.innerHTML = '<h1>Hello World</h1>'
app.appendChild(sub())
document.body.appendChild(app)
$('body').append('<p>look at me! now is ' + moment().format + '</p>');

myPromise.then((number) => {
	$('body').append('<p>promise result is' + number + 'now is ' + moment().format + '</p>');
	//call our jquery plugin
	$('p').greenify();
})