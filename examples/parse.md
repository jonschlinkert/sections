```js
var fs = require('fs');
var readme = fs.readFileSync('readme.md', 'utf8');
sections.parse(readme);
```