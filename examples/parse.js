'use strict';

var fs = require('fs');
var path = require('path');
var fp = path.resolve(__dirname, '../fixtures/basic.md');
var readme = fs.readFileSync(fp, 'utf8');
var sections = require('..');
var parsed = sections.parse(readme);
console.log(parsed);