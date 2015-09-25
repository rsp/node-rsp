#!/bin/sh
":" //#; exec /usr/bin/env node --harmony-proxies "$0" "$@"

var rsp = require('./index.js');

var fp = rsp(function (resolve, reject) {
  setTimeout(function () {
    resolve(Promise.resolve([1,2,3,4]));
  }, 1000);
});

var fp1 = rsp(function (resolve, reject) {
  setTimeout(function () {
    resolve('this is some text');
  }, 2000);
});

var s = fp.map(function (i) { return i+1; });

s.then(function (val) {
  console.log(val);
}, function (error) {
  console.log('error: '+ error);
});

fp1.toUpperCase().split(' ').then(function (val) {
  console.log(val);
}, function (error) {
  console.log('error: '+ error);
});

var promisedText = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("This is a promised value.");
  }, 3000);
});

var rspText = rsp(promisedText);
var upper = rspText.toUpperCase();
var chars = upper.split('');
var joined = chars.join(' ');
var index = joined.indexOf('P');

joined.then(function (value) {
    console.log("Joined text is: " + value);
});

index.then(function (value) {
    console.log("Index is: " + value);
});


// Intro from README.md
var promise1 = rsp(function (resolve, reject) {
  setTimeout(function () {
    resolve("text");
  }, 4000);
});
promise2 = promise1.toUpperCase().split('').join('-');
promise2.then(function (value) {
    console.log('promise2 is: ' + value);
});


// Example from README.md

// You have a promise `p1` that will resolve to `"text"` after 5 seconds:
var p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve("text");
  }, 5000);
});

// You create a magic promise `p2`:
var p2 = rsp(p1);

// Now you can make it uppercase:
var p3 = p2.toUpperCase();

// Then you can split it:
var p4 = p3.split('');

// You can filter it to remove 'E':
var p5 = p4.filter(function (a) { return a != 'E'; });

// You can map it to wrap in paretheses:
var p6 = p5.map(function (a) { return '(' + a + ')'; });

// Then you can join it with dashes:
var p7 = p6.join('-');

// And now you have a promise `p5` that will eventually resolve to '(T)-(X)-(T)'
// but can be prepared way before the original promise `p1` is resolved.
p7.then(function (value) {
    console.log("p7 value is: " + value);
});

