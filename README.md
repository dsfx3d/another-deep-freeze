# Another Deep Freeze

This utility will recursively make the Object/Array and all it's properties/items immutable.

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

Pass the object to deep freeze as argument and generate an immutable clone.

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

// frozenTxn will throw TypeError if you try to mutate existing properties or add new properties

frozen
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update the tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
