
"use strict";

try {
  Proxy;
} catch(e) {
  console.error("No Proxy implementation available. Run node with --harmony-proxies");
  console.error("The harmony-proxy npm module is needed for node with old Proxy API.");
  process.exit(1);
}

var HProxy = typeof Proxy === 'function' ? Proxy : require('harmony-proxy');

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

function noSemicolon() {
  var x = 1
  var y = 2
  var z = 3
  if (x == y) return false
}

