# sections [![NPM version](https://img.shields.io/npm/v/sections.svg)](https://www.npmjs.com/package/sections) [![Build Status](https://img.shields.io/travis/jonschlinkert/sections.svg)](https://travis-ci.org/jonschlinkert/sections)

> Manipulate sections in a markdown string. A 'section' is a block of content preceded by a valid markdown ATX heading.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install sections --save
```

## Usage

This is meant to be fast and opinionated, and only works with [ATX headings](http://spec.commonmark.org/0.24/#atx-headings).

```js
var sections = require('sections');
```

## API

### [.parse](index.js#L33)

Parses sections in a `string` of markdown and returns an object with two properties:

* `sections`: an array of markdown "sections", delimited by [ATX headings](http://spec.commonmark.org/0.24/#atx-headings),
* `result`: the cumulative result of whatever is returned by the (optional) function that is passed as the second argument.
Returns an object that looks [something like this](#example-object)

**Params**

* `string` **{String}**
* `fn` **{Function}**
* `returns` **{Object}**

**Example**

```js
var fs = require('fs');
var readme = fs.readFileSync('example/basic.md', 'utf8');
var sections = require('sections');
console.log(sections.parse(readme));
```

### [.format](index.js#L73)

Format sections. By default, if no filter function is passed, this:

* filters out empty sections
* fixes whitespace between sections

**Params**

* `str` **{String}**: Markdown string
* `fn` **{Function}**: optional filter function
* `returns` **{String}**

### Example object

The parsed object that is returned looks something like this:

```js
{ sections:
   [ Section {
       pos: 12,
       count: 0,
       string: '# sections \n',
       heading: '# sections',
       level: 1,
       title: 'sections',
       body: '' },
     Section {
       pos: 32,
       count: 1,
       string: '\n## Foo\nThis is foo\n',
       heading: '## Foo',
       level: 2,
       title: 'Foo',
       body: 'This is foo' },
     Section {
       pos: 52,
       count: 2,
       string: '\n## Bar\nThis is bar\n',
       heading: '## Bar',
       level: 2,
       title: 'Bar',
       body: 'This is bar' },
     Section {
       pos: 72,
       count: 3,
       string: '\n## Baz\nThis is baz\n',
       heading: '## Baz',
       level: 2,
       title: 'Baz',
       body: 'This is baz' } ],
  result: '',
  headings: [ 'sections', 'Foo', 'Bar', 'Baz' ] }
```

## Related projects

* [gulp-format-md](https://www.npmjs.com/package/gulp-format-md): Gulp plugin for beautifying markdown using pretty-remarkable. | [homepage](https://github.com/jonschlinkert/gulp-format-md)
* [markdown-utils](https://www.npmjs.com/package/markdown-utils): Micro-utils for creating markdown snippets. | [homepage](https://github.com/jonschlinkert/markdown-utils)
* [remarkable](https://www.npmjs.com/package/remarkable): Markdown parser, done right. 100% Commonmark support, extensions, syntax plugins, high speed - all in… [more](https://www.npmjs.com/package/remarkable) | [homepage](https://github.com/jonschlinkert/remarkable)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/sections/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the [MIT license](https://github.com/jonschlinkert/sections/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on March 02, 2016._