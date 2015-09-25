node rsp
========
Radically Simplifed Promises.

A proof-of-concept module that allows you to call methods on promises in the future:
```js
var promise2 = promise1.toUpperCase();
var promise3 = promise2.split('').join('-');
```
Instead of:
```js
promise2 = new Promise(function (resolve, reject) {
  promise1.then(function (value) {
    resolve(value.toUpperCase());
  });
});
promise3 = new Promise(function (resolve, reject) {
  promise2.then(function (value) {
    resolve(value.split('').join('-'));
  });
});
```


This is work in progress - more features to come.

How it works
------------
If you have a promise `p` that will eventually resolve to some value then you can create another promise by calling `rsp(p)` that will also eventually resolve to the same value but you can call methods on it in the future that will give you promises of return values of those method calls on the future resolved value as soon as it is available.

It is easier to explain on an example:

```js

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

// And now you have a promise `p5` that will eventually resolve
// to '(T)-(X)-(T)' after 5 seconds but can be prepared way before
// the original promise `p1` itself is resolved.
p7.then(function (value) {
    console.log("p7 value is: " + value);
});
```

See: [example.js](example.js) for more examples.

Installation
------------
Install to use in your project, updating the dependencies in package.json:
```sh
npm install rsp --save
```
It currently has one dependency:
[harmony-proxy](https://www.npmjs.com/package/harmony-proxy)
to translate [the old Proxy API](https://developer.mozilla.org/en-US/docs/Archive/Web/Old_Proxy_API)
(that both Node.js as of 4.0.0 and io.js as of v2.3.4 currently use)
to the [new API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
defined in the ECMAScript 2015 (ES6) standard.
Additionally both Node.js and io.js need to be run with `--harmony-proxies` for proxies to
be available at all. Using `--harmony` is not enough.

Usage
-----
```js
var rsp = require('rsp');
```
This module uses Harmony Proxies. You need to run node with --harmony-proxies

For example you can run:

```sh
node --harmony-proxies your-script.js
```

Or you can start your script with:

```sh
#!/bin/sh
":" //#; exec /usr/bin/env node --harmony-proxies "$0" "$@"


/* ... your JavaScript code ... */
```
to be able to run it as:
```sh
./your-script.js
```

Issues
------
For any bug reports or feature requests please
[post an issue on GitHub](https://github.com/rsp/node-rsp/issues).

Author
------
Rafał Pocztarski - [https://github.com/rsp](https://github.com/rsp)

License
-------
MIT License (Expat). See [LICENSE.md](LICENSE.md) for details.
