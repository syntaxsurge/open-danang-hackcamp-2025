/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/json-rpc-random-id@1.0.1";
exports.ids = ["vendor-chunks/json-rpc-random-id@1.0.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/json-rpc-random-id@1.0.1/node_modules/json-rpc-random-id/index.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/.pnpm/json-rpc-random-id@1.0.1/node_modules/json-rpc-random-id/index.js ***!
  \**********************************************************************************************/
/***/ ((module) => {

eval("module.exports = IdIterator\n\nfunction IdIterator(opts){\n  opts = opts || {}\n  var max = opts.max || Number.MAX_SAFE_INTEGER\n  var idCounter = typeof opts.start !== 'undefined' ? opts.start : Math.floor(Math.random() * max)\n\n  return function createRandomId () {\n    idCounter = idCounter % max\n    return idCounter++\n  }\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vanNvbi1ycGMtcmFuZG9tLWlkQDEuMC4xL25vZGVfbW9kdWxlcy9qc29uLXJwYy1yYW5kb20taWQvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kb3R1aS8uL25vZGVfbW9kdWxlcy8ucG5wbS9qc29uLXJwYy1yYW5kb20taWRAMS4wLjEvbm9kZV9tb2R1bGVzL2pzb24tcnBjLXJhbmRvbS1pZC9pbmRleC5qcz8xOGQ5Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gSWRJdGVyYXRvclxuXG5mdW5jdGlvbiBJZEl0ZXJhdG9yKG9wdHMpe1xuICBvcHRzID0gb3B0cyB8fCB7fVxuICB2YXIgbWF4ID0gb3B0cy5tYXggfHwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcbiAgdmFyIGlkQ291bnRlciA9IHR5cGVvZiBvcHRzLnN0YXJ0ICE9PSAndW5kZWZpbmVkJyA/IG9wdHMuc3RhcnQgOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZVJhbmRvbUlkICgpIHtcbiAgICBpZENvdW50ZXIgPSBpZENvdW50ZXIgJSBtYXhcbiAgICByZXR1cm4gaWRDb3VudGVyKytcbiAgfVxuXG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/json-rpc-random-id@1.0.1/node_modules/json-rpc-random-id/index.js\n");

/***/ })

};
;