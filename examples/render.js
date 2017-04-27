var fs = require('fs');
var path = require('path');
var sections = require('..');
var str = fs.readFileSync(path.join(__dirname, '../readme.md'), 'utf8');
var write = require('write');

var expected = [
  'sections',
  'Usage',
  'Install',
  'API',
  '[.parse](index.js#L34)',
  '[.format](index.js#L74)',
  'Example object',
  'About',
  'Related projects',
  'Contributing',
  'Building docs',
  'Running tests',
  'Author',
  'License',
].join('');

var obj = sections.parse(str);
var sorted = sections.sortBy(obj, 'title', ['.', 'Usage', 'Install']);
var res = sections.render(sorted);

console.log(obj);
write.sync(path.join(__dirname, '../README.md'), res);
