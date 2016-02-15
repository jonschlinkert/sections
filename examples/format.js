'use strict';

var fs = require('fs');
var path = require('path');
var str = fs.readFileSync('readme.md', 'utf8');
var sections = require('..');

// var formatted = sections.format(str, function(section, prev, next) {
//   if (section.body.trim() === '' && next.level !== (section.level + 1)) {
//     return null;
//   }
//   return section.string;
// });

var formatted = sections.format(str);
console.log(formatted);
