# object-mappr [![Donate on Gittip](http://badgr.co/gittip/twolfson.png)](https://www.gittip.com/twolfson/)

Map, alias, and flatten object values to other object values.

This project was created as part of [doubleshot][doubleshot], perfoming the value mapping, aliasing, and flattening duties.

[doubleshot]: https://github.com/twolfson/doubleshot

## Getting Started
Install the module with: `npm install object-mappr`

Below is an example of what goes on under the hood of [doubleshot][doubleshot].

```javascript
// Map over test content
var objectMapper = require('object-mappr'),
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
`object-mappr` provides a function to process aliasing, mapping, and flattening on.

```js
/**
 * Map, alias, and flatten object values to other object values.
 * @param {Object} input Object with values to map
 * @param {Object} [options] Flags to adjust how the mapping is performed
 * @param {Boolean} [options.alias] If the value is a string, `value = input[value]`
 * @param {Boolean} [options.map] If a value is an array, its values will be processed via the aliasing proxy.
 * @param {Boolean} [options.flatten] If the value is an array and contains arrays, the array will be flattened.
 * @param {Function[]} [options.middlewares] If provided, these functions will be appended to the array of middlewares.
 * @returns {Object} Mapped, aliased, and flattened copy of `input`
 */
```

## Examples
Here is an example using `map`, `alias`, and `flatten`

```js
// A complex mapping
var mappedObj = objectMapper({
      'A fruit': 'A banana',
      'A banana': function () {
        this.color = 'yellow';
        this.fruit = new Banana();
      },
      'is yellow': ['hasColor', 'assertColor'],
      'when peeled is white': ['when peeled', 'is white'],
      'when peeled': function () {
        this.color = 'white';
        this.fruit = this.fruit.peel();
      },
      'is white': ['hasColor', 'assertColor'],
      'hasColor': function () {
        assert(this.fruit.color);
      },
      'assertColor': function () {
        assert.strictEqual(this.fruit.color, this.color);
      }
    }, {
      alias: true,
      map: true,
      flatten: true
    });

// when mapped looks like
mappedObj;
/*
{
  'A fruit': function () {
    this.color = 'yellow';
    this.fruit = new Banana();
  },
  'A banana': function () {
    this.color = 'yellow';
    this.fruit = new Banana();
  },
  'is yellow': [
    function () {
      assert(this.fruit.color);
    },
     function () {
      assert.strictEqual(this.fruit.color, this.color);
    }
  ],
  'when peeled is white': [
     function () {
      this.color = 'white';
      this.fruit = this.fruit.peel();
    },
    function () {
      assert(this.fruit.color);
    },
     function () {
      assert.strictEqual(this.fruit.color, this.color);
    }
  ],
  'when peeled': function () {
    this.color = 'white';
    this.fruit = this.fruit.peel();
  },
  'is white': [
    function () {
      assert(this.fruit.color);
    },
     function () {
      assert.strictEqual(this.fruit.color, this.color);
    }
  ],
  'hasColor': function () {
    assert(this.fruit.color);
  },
  'assertColor': function () {
    assert.strictEqual(this.fruit.color, this.color);
  }
}
*/
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.

## License
Copyright (c) 2013 Todd Wolfson

Licensed under the MIT license.
