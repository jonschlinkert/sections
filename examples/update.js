'use strict';

var fs = require('fs');
var path = require('path');
var str = fs.readFileSync('fixtures/basic.md', 'utf8');
var sections = require('..');
var emit = sections.emit;

function update(str, heading, val, placement) {
  return sections.format(str, function(section) {
    var content = '';

    switch (isMatch(heading, section.title, placement)) {
      case 'inner':
      case 'inside':
      case 'between':
        content = emit(section.heading);
        content += emit(val.trim());
        content += emit(section.body);
        return content;
      case 'before':
      case 'prepend':
        content = emit(val.trim());
        content += emit(section.heading);
        content += emit(section.body);
        return content;
      case 'after':
      case 'append':
        content = emit(section.heading);
        content += emit(section.body);
        content += emit(val.trim());
        return content;
      default: {
        return section.string;
      }
    }
  });
}

function isMatch(heading, title, placement) {
  var re = new RegExp(title, 'i')
  if (re.test(heading)) {
    return placement;
  }
  return false;
}

var res = update(str, 'Foo', 'a\nb\nc', 'between');
console.log(res)
