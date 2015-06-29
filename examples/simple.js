var chain = require('../dist').chain;

function base() {
  console.log('BASE');
}

function child() {
  console.log('CHILD');
}

var base = chain(base, { child : child } );

base(); // Prints BASE
base().child(); // Prints CHILD
