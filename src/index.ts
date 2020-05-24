/**
 * Deep freezes the passed object to make it non-extensible and immutable
 * In case of an object, recursively freezes all of it's properties.
 * In case of an array, recursively freezes all of it's items
 *
 * @param {Object|Array} obj The object to freeze
 * @param {boolean} inplace Freeze inplace or freeze a clone
 * @returns {Object|Array} frozen object
 */
const deepFreeze = (obj: any, inplace: boolean = false): any => {
  if (!inplace) {
    obj = Array.isArray(obj) ? [...obj] : { ...obj }
  }

  let key: string
  for (key of Object.keys(obj)) {
    if (typeof obj[key] === 'object') {
      obj[key] = deepFreeze(obj[key], inplace)
    }
    obj[key].__proto__ = Object.preventExtensions(obj[key].__proto__)
  }

  obj.__proto__ = Object.preventExtensions(obj.__proto__)
  /* istanbul ignore next */
  return Object.isFrozen(obj) ? obj : Object.freeze(obj)
}

export default deepFreeze
