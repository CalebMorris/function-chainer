"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _ = _interopRequire(require("lodash"));

var Promise = _interopRequire(require("bluebird"));

/*
 * Error for possibly common throw cases
 *   - Any function names are defined Promise attributes
 *   - Are duplicates
 */
function InvalidChildNameError() {
  var message = arguments[0] === undefined ? "" : arguments[0];

  this.name = "InvalidChildNameError";
  this.message = message;
}
InvalidChildNameError.prototype = Error.prototype;

/*
 * Generates the necessary chaining wrappers for a function and children
 * @param {Func} base - function that others may be called from in the form
 *  `base().child()`
 * @param {Object<Func>} chlidren - List of children functions to be generated as
 * well
 * @throws InvalidChildNameError
 * @returns {Func} - Chained function
 */
function chain(base, children) {

  children = children || [];

  var wrappedFunc = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var baseArguments = args;

    var isLoaded = false;
    var shouldContinue = true;
    var result = null;

    function baseResult() {
      for (var _len2 = arguments.length, baseResultArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        baseResultArgs[_key2] = arguments[_key2];
      }

      if (shouldContinue) {
        result = base.apply(undefined, baseResultArgs);
      }
      return result;
    }

    var executionPromise = new Promise(function (resolve) {
      function checkLoaded() {
        if (isLoaded) {
          return resolve(baseResult.apply(undefined, _toConsumableArray(baseArguments)));
        }
        setTimeout(checkLoaded, 0);
      }

      checkLoaded();
    });

    _.each(children, function (child, name) {

      if (executionPromise.hasOwnProperty(name)) {
        throw new InvalidChildNameError("Property already attached to execution '" + name + "'");
      }

      executionPromise[name] = function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        shouldContinue = false;
        result = child.apply(undefined, args);
        return Promise.resolve(result);
      };
    });

    isLoaded = true;

    return executionPromise;
  };

  return wrappedFunc;
}

module.exports = { chain: chain, InvalidChildNameError: InvalidChildNameError };