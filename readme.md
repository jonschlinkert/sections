# sections [![NPM version](https://img.shields.io/npm/v/sections.svg?style=flat)](https://www.npmjs.com/package/sections) [![NPM monthly downloads](https://img.shields.io/npm/dm/sections.svg?style=flat)](https://npmjs.org/package/sections)  [![NPM total downloads](https://img.shields.io/npm/dt/sections.svg?style=flat)](https://npmjs.org/package/sections) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/sections.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/sections)

> Manipulate sections in a markdown string. A 'section' is a block of content preceded by a valid markdown ATX heading.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save sections
```

Install with [yarn](https://yarnpkg.com):

```sh
$ yarn add sections
```

## Usage

This is meant to be fast and opinionated, and only works with [ATX headings](http://spec.commonmark.org/0.24/#atx-headings).

```js
var sections = require('sections');
var obj = sections.parse(str);
```

## API

<details>
<summary><strong>.parse</strong></summary>

### [.parse](index.js#L34)

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
var readme = fs.readFileSync('readme.md', 'utf8');
var sections = require('sections');
console.log(sections.parse(readme));
```

</details>

<details>
<summary><strong>.format</strong></summary>

### [.format](index.js#L72)

Format sections. By default, if no filter function
is passed, this filters out empty sections fixes
whitespace between sections.

**Params**

* `str` **{String}**: Markdown string
* `fn` **{Function}**: optional filter function
* `returns` **{String}**

</details>

<details>
<summary><strong>.sortBy</strong></summary>

### [.sortBy](index.js#L117)

Sort the sections in a parsed sections object, by the
given `prop` and array of `values`.

**Params**

* `obj` **{Object}**: Object returned from [.parse](#parse)
* `prop` **{String|Array}**: Defaults to `title`. The property to sort by, or the array of values to sort by.
* `values` **{Array}**: Array of values to sort by.
* `returns` **{Object}**

</details>

<details>
<summary><strong>.render</strong></summary>

### [.render](index.js#L152)

Renders the array of `sections` from [.parse](#parse).

**Params**

* `obj` **{Object}**: Sections object returned from [.parse](#parse)
* `values` **{Array}**: (optional) To sort the array of sections by `title`, pass an array of values to sort by.
* `returns` **{String}**

**Example**

```js
var fs = require('fs');
var readme = fs.readFileSync('readme.md', 'utf8');
var sections = require('sections');
var obj = sections.parse(readme);
var str = sections.render(obj);
console.log(str);
```

</details>

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

## About

### Related projects

* [gulp-format-md](https://www.npmjs.com/package/gulp-format-md): Gulp plugin for beautifying markdown using pretty-remarkable. | [homepage](https://github.com/jonschlinkert/gulp-format-md "Gulp plugin for beautifying markdown using pretty-remarkable.")
* [markdown-utils](https://www.npmjs.com/package/markdown-utils): Micro-utils for creating markdown snippets. | [homepage](https://github.com/jonschlinkert/markdown-utils "Micro-utils for creating markdown snippets.")
* [remarkable](https://www.npmjs.com/package/remarkable): Markdown parser, done right. 100% Commonmark support, extensions, syntax plugins, high speed - all in… [more](https://github.com/jonschlinkert/remarkable) | [homepage](https://github.com/jonschlinkert/remarkable "Markdown parser, done right. 100% Commonmark support, extensions, syntax plugins, high speed - all in one.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on April 27, 2017._