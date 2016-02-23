'use strict';

var define = require('define-property');
var gfm = require('gfm-code-blocks');

exports.extract = function(str) {
  var file = { contents: str };
  var examples = gfm(str);
  var examplesMap = {};

  for (var i = 0; i < examples.length; i++) {
    var code = examples[i];

    var key = ('__GFM_' + i + '__');
    code.key = key;
    examplesMap[key] = code;
    str = str.split(code.block).join(key);
  }

  file.contents = str;
  file.examples = examplesMap;
  return file;
};

exports.restore = function(file) {
  var map = file.examples;
  for (var key in map) {
    var val = map[key];
    file.contents = file.contents.replace(val.key, val.block);
  }
  return file.contents;
};