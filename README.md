# Function Chainer

Function chainer to simplify response function calls


# Example

```javascript

var generate = require('wrapper-generator').generate;

function base() {
  console.log('BASE');
}

function child() {
  console.log('CHILD');
}

var base = generate(base, { child : child });

base(); // Prints BASE
base().child(); // Prints CHILD


```
