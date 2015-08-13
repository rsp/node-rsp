
"use strict";

module.exports = rsp;

var prox = {
  get: function (target, name, receiver) {
     // console.log('proxy: '+name+' for '+target);
     if (name === 'then' || name === 'catch') {
       // console.log('T');
       return target[name].bind(target);
     } else {
       // console.log('F');
       return function () {
         var args = Array.prototype.slice.call(arguments);
         return rsp(target.then(function (value) {
           if (typeof value[name] !== 'function')
             throw new Error("no method '" + name + "'");
           return value[name].apply(value, args);
         }));
       };
     }
  }
};

function rsp(p) {
  return new Proxy(p, prox);
}

function rspromise(f) {
  var p = new Promise(f);
  return rsp(p);
}

/*
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

p1.toUpperCasee().split(' ').then(function (val) {
  console.log(val);
}, function (error) {
  console.log('error: '+ error);
});
*/

