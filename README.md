# Function Chainer

[![Build
Status](https://api.shippable.com/projects/55b07d2aedd7f2c05280226a/badge?branchName=master)](https://app.shippable.com/projects/55b07d2aedd7f2c05280226a/builds/latest) [![Coverage
Status](https://coveralls.io/repos/CalebMorris/function-chainer/badge.svg?branch=master&service=github)](https://coveralls.io/github/CalebMorris/function-chainer?branch=master)

Function chainer to simplify response function calls


# Example

```javascript

var chain = require('function-chainer').chain;

function base() {
  console.log('BASE');
}

function child() {
  console.log('CHILD');
}

var base = chain(base, { child : child });

base(); // Prints BASE
base().child(); // Prints CHILD

```
