# object-mapper [![Donate on Gittip](http://badgr.co/gittip/twolfson.png)](https://www.gittip.com/twolfson/)

Map, alias, and flatten object values to other object values.

This project was created as part of [doubleshot][doubleshot], perfoming the value mapping, aliasing, and flattening duties.

[doubleshot]: https://github.com/twolfson/doubleshot

## Getting Started
Install the module with: `npm install object-mapper`

Below is an example of what goes on under the hood of [doubleshot][doubleshot].

```javascript
// Map over test content
var objectMapper = require('object-mapper'),
    mappedObj = objectMapper({
      '1 + 2': ['One', 'plus two'],
      'One': function () {
        this.sum = 1;
      },
      'plus two': function () {
        this.sum += 2;
      },
      '= 3': 'equals three',
      'equals three': function () {
        assert.strictEqual(this.sum, 3);
      }
    }, {
    // Alias, map, and flatten values to other values
      alias: true,
      map: true
    });

// Result looks like
mappedObj;
/*
{
  '1 + 2': [
    function () {
      this.sum = 1;
    },
    function () {
      this.sum += 2;
    }
  ],
  'One': function () {
    this.sum = 1;
  },
  'plus two': function () {
    this.sum += 2;
  },
  '= 3': function () {
    assert.strictEqual(this.sum, 3);
  },
  'equals three': function () {
    assert.strictEqual(this.sum, 3);
  }
}
*/
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## License
Copyright (c) 2013 Todd Wolfson

Licensed under the MIT license.
