type DeepReadonly<T> =
	T extends (infer R)[] ? DeepReadonlyArray<R> :
	T extends object ? DeepReadonlyObject<T> :
	T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> { }

type DeepReadonlyObject<T> = {
	readonly [P in keyof T]: DeepReadonly<T[P]>;
};


/**
 * Deep freezes the passed object to make it non-extensible and immutable
 * In case of an object, recursively freezes all of it's properties.
 * In case of an array, recursively freezes all of it's items
 *
 * @param {Object|Array} obj The object to freeze
 * @param {boolean} inplace Freeze inplace or freeze a clone
 * @returns {Object|Array} frozen object
 */
export default function deepFreeze<T extends object | any[]>(source: T, inplace: boolean = false): DeepReadonly<T> {
  let frozen = source as any;

  if (!inplace) {
    frozen = Array.isArray(frozen) ? [...frozen] : { ...frozen };
  }

  for (const key of Object.keys(frozen)) {
    if (typeof frozen[key] === 'object') {
      frozen[key] = deepFreeze(frozen[key], inplace)
    }

    frozen[key].__proto__ = Object.preventExtensions(frozen[key].__proto__)
  }

  frozen.__proto__ = Object.preventExtensions(frozen.__proto__)

  /* istanbul ignore next */
  return Object.isFrozen(frozen) ? frozen : Object.freeze(frozen)
}
