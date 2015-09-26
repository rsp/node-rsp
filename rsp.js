/*!
Radically Simplifed Promises - Browser Version
Copyright (c) 2015 Rafał Pocztarski
MIT License: https://github.com/rsp/node-rsp/blob/master/LICENSE.md
Project website: https://github.com/rsp/node-rsp
For browser compatibility see:
https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy#Browser_compatibility
*/

var rsp = (function () {

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
  if (typeof p.then === 'function') {
    return new HProxy(p, prox);
  } else {
    return rspromise(p);
  }
}

function rspromise(f) {
  var p = new Promise(f);
  return rsp(p);
}

return rsp;

}());

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
