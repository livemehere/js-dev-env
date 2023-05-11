"use strict";

require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
var delay = function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(null);
    }, ms);
  });
};