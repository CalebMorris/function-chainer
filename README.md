# Function Chainer

Function chainer to simplify response function calls


# Example

```javascript

var chain = require('wrapper-generator').chain;

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
