# Another Deep Freeze

This utility will recursively make the Object/Array and all it's properties/items immutable.

[![npm version](https://badge.fury.io/js/another-deep-freeze.svg)](https://badge.fury.io/js/another-deep-freeze)
[![Build Status](https://travis-ci.org/dsfx3d/another-deep-freeze.svg?branch=master)](https://travis-ci.org/dsfx3d/another-deep-freeze)
[![code cove](https://codecov.io/gh/dsfx3d/another-deep-freeze/branch/master/graph/badge.svg)](https://codecov.io/gh/dsfx3d/another-deep-freeze/branch/master/graph/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d1ab723bcfaa460aa9d12ccc7a54bf65)](https://www.codacy.com/manual/dsfx3d/another-deep-freeze?utm_source=github.com&utm_medium=referral&utm_content=dsfx3d/another-deep-freeze&utm_campaign=Badge_Grade)
![another-deep-freeze](https://badgen.net/bundlephobia/minzip/another-deep-freeze)

Javascript provides a built-in utility ([Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)) for freezing objects but it only freezes immediate properties of the object. If a property's depth is greater than 1 it will still remain mutable.

## Installation

NPM

```bash
npm i -S another-deep-freeze
```

Yarn

```bash
yarn add another-deep-freeze --save
```

## Usage

Pass the object to `deepFreeze` and generate an immutable clone.

```javascript
import deepFreeze from 'another-deep-freeze'

const txn = {
  _id: 1,
  amount: 1000.0,
  branch: {
    _id: 1,
    tellers: [1, { _id: 2, code: 'XYZ001' }]
  }
}

// freeze txn in a cloned object
const frozenTxn = deepFreeze(txn)

txn === frozenTxn // false
```

The following operations will throw TypeError

```javascript
// 1. mutating existing key
frozenTxn._id = 2
// 2. adding new key
frozenTxn.newKey = 1
// 3. deleting a key
delete forzenTxn.branch
// same behaviour at all depths
frozenTxn.branch._id = 2
// even for an array
frozenTxn.branch.tellers.push(0)
// or an array of objects
frozenTxn.branch.tellers[1].code = 'NEWCODE'

// the prototypes are immutable and any attempt of mutation will throw TypeError
Object.setPrototypeOf(frozenTxn, { foo: 'baz' })
txn.branch.__proto__.foo = 'baz'
txn.branch.tellers.__proto__.length = 0
```

You may also perform in-place deep freeze.

```javascript
import deepFreeze from 'another-deep-freeze'

const txn = {
  _id: 1,
  amount: 1000.0,
  branch: {
    _id: 1,
    tellers: [1, { _id: 2, code: 'XYZ001' }]
  }
}

const sameTxn = deepFreeze(txn, /* in-place deep freeze*/ true)

sameTxn === txn // true
```

This will make `txn` immutable at all depths

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update the tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
