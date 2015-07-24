var chain = require('../dist').chain;

function base() {
  console.log('BASE');
}

function child() {
  console.log('CHILD');
}

var baseWrapped = chain(base, { child : child });

baseWrapped(); // Prints BASE
baseWrapped().child(); // Prints CHILD
