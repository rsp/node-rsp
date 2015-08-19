#!/bin/sh 
":" //# comment; exec /usr/bin/env node --harmony-proxies "$0" "$@"

var rsp = require('./index.js');

function rspromise (f) {
  var p = new Promise(f);
  return rsp(p);
}

var p = rspromise(function (resolve, reject) {
  setTimeout(function () {
    resolve(Promise.resolve([1,2,3,4]));
  }, 2000);
});

var p1 = rspromise(function (resolve, reject) {
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

