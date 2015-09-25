#!/bin/sh 
":" //# comment; exec /usr/bin/env node --harmony-proxies "$0" "$@"

var rsp = require('./index.js');

var p = rsp(function (resolve, reject) {
  setTimeout(function () {
    resolve(Promise.resolve([1,2,3,4]));
  }, 1000);
});

var p1 = rsp(function (resolve, reject) {
  setTimeout(function () {
    resolve('this is some text');
  }, 2000);
});

var s = p.map(function (i) { return i+1; });

s.then(function (val) {
  console.log(val);
}, function (error) {
  console.log('error: '+ error);
});

p1.toUpperCase().split(' ').then(function (val) {
  console.log(val);
}, function (error) {
  console.log('error: '+ error);
});

