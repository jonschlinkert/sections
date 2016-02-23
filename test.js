'use strict';

require('mocha');
var fs = require('fs');
var assert = require('assert');
var sections = require('./');

function fixture(name) {
  return fs.readFileSync('fixtures/' + name, 'utf8');
}

describe('sections', function() {
  describe('exports', function() {
    it('should export an object', function() {
      assert(sections);
      assert.equal(typeof sections, 'object');
    });

    it('should expose a `parse` method', function() {
      assert.equal(typeof sections.parse, 'function');
    });

    it('should expose a `format` method', function() {
      assert.equal(typeof sections.format, 'function');
    });
  });

  describe('parse', function() {
    it('should throw an error when invalid args are passed', function(cb) {
      try {
        sections.parse();
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert.equal(err.message, 'expected a string');
        cb();
      }
    });

    it('should return an object of sections', function() {
      assert(sections.parse(fixture('basic.md')));
      assert.equal(typeof sections.parse(fixture('basic.md')), 'object');
    });

    it('should have a sections array', function() {
      assert(Array.isArray(sections.parse(fixture('basic.md')).sections));
    });

    it('should have a result string', function() {
      var parsed = sections.parse(fixture('basic.md'));
      assert.equal(parsed.result, '');
    });
  });

  describe('format', function() {
    it('should throw an error when invalid args are passed', function(cb) {
      try {
        sections.format();
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert.equal(err.message, 'expected a string');
        cb();
      }
    });

    it('should remove empty middle sections by default', function() {
      var str = fixture('empty-middle.md');
      var actual = sections.format(str);
      assert(!/Bar/i.test(actual));
    });

    it('should remove empty end sections by default', function() {
      var str = fixture('empty-end.md');
      var actual = sections.format(str);
      assert(!/Qux/i.test(actual));
    });

    it('should not remove beginning headings', function() {
      var str = fixture('empty-first.md');
      var actual = sections.format(str);
      assert(/sections/i.test(actual));
    });

    it('should not remove empty section headings', function() {
      var str = fixture('empty-heading.md');
      var actual = sections.format(str);
      assert(/foo/i.test(actual));
    });

    it('should remove extra newlines', function() {
      var str = fixture('extra-newlines.md');
      assert(/\n{3,}/.test(str));
      var actual = sections.format(str);
      assert(!/\n{3,}/.test(actual));
    });

    it('should not format fenced code', function() {
      var str = fixture('gfm.md');
      var actual = sections.format(str);
      assert(/sh\n#/.test(actual));
    });

    it('should add newlines before tight headings', function() {
      var str = fixture('tight.md');
      assert(!/\n\n## Foo/.test(str));
      assert(!/\n\n## Bar/.test(str));
      assert(!/\n\n## Baz/.test(str));

      var actual = sections.format(str);
      assert(/\n\n## Foo/.test(actual));
      assert(/\n\n## Bar/.test(actual));
      assert(/\n\n## Baz/.test(actual));
    });

    it('should add newlines after tight headings', function() {
      var str = fixture('tight.md');
      assert(!/## Foo\n\n/.test(str));
      assert(!/## Bar\n\n/.test(str));
      assert(!/## Baz\n\n/.test(str));

      var actual = sections.format(str);
      assert(/## Foo\n\n/.test(actual));
      assert(/## Bar\n\n/.test(actual));
      assert(/## Baz\n\n/.test(actual));
    });
  });
});
