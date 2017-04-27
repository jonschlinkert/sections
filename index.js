/*!
 * sections <https://github.com/jonschlinkert/sections>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var sortBy = require('sort-by-value');
var gfm = require('gfm-code-blocks');

/**
 * Parses sections in a `string` of markdown and returns an object
 * with two properties:
 *
 * - `sections`: an array of markdown "sections", delimited by [ATX headings][atx],
 * - `result`: the cumulative result of whatever is returned by the (optional) function that is passed as the second argument.
 *
 * Returns an object that looks [something like this](#example-object)
 *
 * ```js
 * var fs = require('fs');
 * var readme = fs.readFileSync('readme.md', 'utf8');
 * var sections = require('sections');
 * console.log(sections.parse(readme));
 * ```
 * @param {String} `string`
 * @param {Function} `fn`
 * @return {Object}
 * @api public
 */

exports.parse = function(str, fn) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  var sections = str.split(/(?=\n(?:#|<!-- *section:))/);
  var res = { sections: [], result: '', headings: [] };
  var len = sections.length;
  var idx = -1;
  var pos = 0;

  while (++idx < len) {
    var content = sections[idx];
    var section = new Section(content, idx, pos += content.length);
    res.headings.push(section.title);
    res.sections.push(section);

    if (typeof fn === 'function') {
      var val = fn(section);
      if (typeof val === 'string') {
        res.result += val;
      }
    }
  }
  return res;
};

/**
 * Format sections. By default, if no filter function
 * is passed, this filters out empty sections fixes
 * whitespace between sections.
 *
 * @param {String} `str` Markdown string
 * @param {Function} `fn` optional filter function
 * @return {String}
 * @api public
 */

exports.format = function(str, fn) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  if (typeof fn !== 'function') {
    fn = filter;
  }

  var end = endingWs(str);
  var file = extractGfm(str);
  str = file.contents;

  var parsed = exports.parse(str);
  var len = parsed.sections.length;
  var idx = -1;
  var res = '';

  while (++idx < len) {
    var section = parsed.sections[idx];
    var prev = parsed.sections[idx - 1] || {};
    var next = parsed.sections[idx + 1] || {};

    var val = fn(section, prev, next);
    if (typeof val === 'string') {
      section.formatted = val;
      res += val;
    }
  }

  file.contents = res;
  return restoreGfm(file).trim() + end;
};

/**
 * Sort the sections in a parsed sections object, by the
 * given `prop` and array of `values`.
 *
 * @param {Object} `obj` Object returned from [.parse](#parse)
 * @param {String|Array} `prop` Defaults to `title`. The property to sort by, or the array of values to sort by.
 * @param {Array} `values` Array of values to sort by.
 * @return {Object}
 * @api public
 */

exports.sortBy = function(obj, prop, values) {
  if (Array.isArray(prop)) {
    values = prop;
    prop = 'title';
  }

  var arr = obj.sections.slice();
  var initial = [];

  if (values[0] === '.') {
    initial.push(arr.shift());
  }

  var rest = sortBy(arr, {values: values, prop: prop});
  obj.sections = initial.concat(rest);
  return obj;
};

/**
 * Renders the array of `sections` from [.parse](#parse).
 *
 * ```js
 * var fs = require('fs');
 * var readme = fs.readFileSync('readme.md', 'utf8');
 * var sections = require('sections');
 * var obj = sections.parse(readme);
 * var str = sections.render(obj);
 * console.log(str);
 * ```
 * @param {Object} `obj` Sections object returned from [.parse](#parse)
 * @param {Array} `values` (optional) To sort the array of sections by `title`, pass an array of values to sort by.
 * @return {String}
 * @api public
 */

exports.render = function(obj, arr) {
  if (Array.isArray(arr)) {
    obj = exports.sortBy(obj, 'title', arr);
  }

  var str = '';
  for (var i = 0; i < obj.sections.length; i++) {
    str += obj.sections[i].string;
  }
  return str;
};

/**
 * Filter out empty sections
 */

function filter(section, prev, next) {
  var body = section.body.trim();
  return !(body === '' && next.level !== (section.level + 1))
    ? emit(section.heading) + (body ? emit(section.body) : '')
    : null;
}

/**
 * Create a new markdown section at the given position.
 */

function Section(input, count, pos) {
  var str = input.trim();
  this.pos = pos;
  this.count = count;
  this.string = input;
  this.heading = getHeading(str);
  this.level = getLevel(this);
  this.title = getTitle(this);
  this.body = str.slice(this.heading.length).trim();
  this.body = condenseBold(this.body);

  this.body = this.body.replace(/\n{2,}/g, '\n\n');

  if (hasBadge(count, this.title)) {
    badge(this);
  }
}

/**
 * Utils
 */

function extractGfm(str) {
  var file = { contents: str };
  var examples = gfm(str);
  var examplesMap = {};

  for (var i = 0; i < examples.length; i++) {
    var code = examples[i];

    var key = ('@#GFM_' + i + '#@');
    code.key = key;
    examplesMap[key] = code;
    str = str.split(code.block).join(key);
  }

  file.contents = str;
  file.examples = examplesMap;
  return file;
};

function restoreGfm(file) {
  var map = file.examples;
  var str = file.contents;
  for (var key in map) {
    str = str.split(key).join(map[key].block);
  }
  return str;
}

function condenseBold(str) {
  var re = /^([*]{2}(.*?)[*]{2})(?=\n|$)/gm;
  var m = re.exec(str);
  if (!m) return str;
  return str.split(m[0]).join('\n' + emit(m[1]) + '\n');
}

function getLevel(section) {
  var prefix = /^#+/.exec(section.heading);
  return prefix ? prefix[0].length : 0;
}

function getHeading(str) {
  var next = str.indexOf('\n');
  if (next === -1) {
    next = str.length;
  }

  return str.slice(0, next);
}

function getTitle(section) {
  var title = section.heading.slice(section.level).trim();
  var match = /^<!-- *section:(.*?) *-->/.exec(title);
  if (match) {
    title = match[1].trim();
  }
  return title;
}

function hasBadge(idx, title) {
  return idx === 0 && title.indexOf('[![') !== -1;
}

function badge(section) {
  var title = section.title;
  title = title.slice(0, title.indexOf('[!['));
  if (!section.hasOwnProperty('badges')) {
    section.badges = [];
  }
  section.badges.push(title.slice(title.length).trim());
  section.title = title.trim();
}

function emit(str) {
  return '\n' + toString(str) + '\n';
}

function endingWs(str) {
  var m = /(\s+)$/.exec(str) || [];
  return m[1] || '';
}

function toString(str) {
  return String(str || '').trim();
}

/**
 * Expose `emit`
 */

exports.emit = emit;
