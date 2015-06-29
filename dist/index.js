"use strict";

var _endpointGenerator = require("./endpoint-generator");

var chain = _endpointGenerator.chain;
var InvalidChildNameError = _endpointGenerator.InvalidChildNameError;
module.exports = { chain: chain, InvalidChildNameError: InvalidChildNameError };