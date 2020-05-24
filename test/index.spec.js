import deepFreeze from '../src/index'

describe('deepFreeze:object', () => {
  it('returns-a-cloned-object-for-object-of-depth-1', () => {
    const obj = { a: 1 }
    const frozenObj = deepFreeze(obj)

    expect(obj).not.toBe(frozenObj)
    expect(obj.a).toBe(frozenObj.a)
  })
  it('freezes-the-object-of-depth-1', () => {
    const obj = { a: 1 }
    const frozenObj = deepFreeze(obj)

    const mutation = () => (frozenObj.a = 2)
    expect(mutation).toThrow(TypeError)
    expect(mutation).toThrowError(ERRORS.READ_ONLY('a'))
  })
  it('makes-the-object-non-extensible', () => {
    const obj = { a: 1 }
    const frozenObj = deepFreeze(obj)

    const insertion = () => (frozenObj.b = 1)
    expect(insertion).toThrow(TypeError)
    expect(insertion).toThrowError(ERRORS.CANT_ADD_PROP('b'))
  })
  it('makes-the-properties-non-deletable', () => {
    const obj = { a: 1 }
    const frozenObj = deepFreeze(obj)
    const del = () => delete frozenObj.a
    expect(del).toThrow(TypeError)
    expect(del).toThrowError(ERRORS.CANT_DEL_PROP('a'))
  })
  it('does-not-perform-inplace-deep-freeze-by-default', () => {
    const obj = { a: 1 }
    deepFreeze(obj)
    const mutation = () => (obj.a = 2)

    expect(mutation).not.toThrow(TypeError)
    expect(mutation).not.toThrowError(ERRORS.READ_ONLY('a'))
  })
  it('does-not-make-an-object-non-extensible-inplace-by-default', () => {
    const insertion = () => (obj.b = 1)
    expect(insertion).not.toThrow(TypeError)
    expect(insertion).not.toThrowError(ERRORS.CANT_ADD_PROP('b'))
  })
  it('returns-the-same-object-when-inplace-argument-is-true', () => {
    const obj = { a: 1 }
    const frozenObj = deepFreeze(obj, true)

    expect(obj).toBe(frozenObj)
  })
  it('makes-the-properties-non-deletable-inplace', () => {
    const obj = { a: 1 }
    deepFreeze(obj, true)
    const del = () => delete obj.a
    expect(del).toThrow(TypeError)
    expect(del).toThrowError(ERRORS.CANT_DEL_PROP('a'))
  })
  it('freezes-the-object-inplace-if-inplace-argument-is-true', () => {
    const obj = { a: 1 }
    deepFreeze(obj, true)
    const mutation = () => (obj.a = 2)

    expect(mutation).toThrow(TypeError)
    expect(mutation).toThrowError(ERRORS.READ_ONLY('a'))
  })
  it('freezes-the-object-inplace-if-inplace-argument-is-true', () => {
    const obj = { a: 1 }
    deepFreeze(obj, true)
    const mutation = () => (obj.b = 2)

    expect(mutation).toThrow(TypeError)
    expect(mutation).toThrowError(ERRORS.CANT_ADD_PROP('b'))
  })
  it('returns-a-cloned-object-for-object-of-depth-greater-than-1', () => {
    const obj = { a: { b: 1, c: { d: 1 } } }
    const frozenObj = deepFreeze(obj)

    expect(obj).not.toBe(frozenObj)
    expect(obj.a.b).toBe(frozenObj.a.b)
    expect(obj.a.c.d).toBe(frozenObj.a.c.d)
  })
  it('freezes-the-passed-object-of-depth-greater-than-1', () => {
    const obj = { a: { b: 1, c: { d: 1 } } }
    const frozenObj = deepFreeze(obj)

    // depth 2
    const mutateDepth2 = () => (frozenObj.a.b = 2)
    expect(mutateDepth2).toThrow(TypeError)
    expect(mutateDepth2).toThrowError(ERRORS.READ_ONLY('b'))
    const mutateDepth2_2 = () => (frozenObj.a.c = 1)
    expect(mutateDepth2_2).toThrow(TypeError)
    expect(mutateDepth2_2).toThrowError(ERRORS.READ_ONLY('c'))
    // depth 3
    const mutateDepth3 = () => (frozenObj.a.c.d = 2)
    expect(mutateDepth3).toThrow(TypeError)
    expect(mutateDepth3).toThrowError(ERRORS.READ_ONLY('d'))
  })
  it('makes-the-passed-object-of-depth-greater-than-1-non-extensible', () => {
    const obj = { a: { b: 1, c: { d: 1 } } }
    const frozenObj = deepFreeze(obj)

    // depth 2
    const mutateDepth2 = () => (frozenObj.a.a = 2)
    expect(mutateDepth2).toThrow(TypeError)
    expect(mutateDepth2).toThrowError(ERRORS.CANT_ADD_PROP('a'))
    // depth 3
    const mutateDepth3 = () => (frozenObj.a.c.a = 2)
    expect(mutateDepth3).toThrow(TypeError)
    expect(mutateDepth3).toThrowError(ERRORS.CANT_ADD_PROP('a'))
  })
})

describe('deepFreeze:array', () => {
  it('freezes-the-array', () => {
    const arr = [0, 1, 2]
    const frozen = deepFreeze(arr)
    const mutate = () => (frozen[0] = 1)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('0', '[object Array]'))
  })
  it('makes-the-array-non-extensible', () => {
    const arr = [0, 1, 2]
    const frozen = deepFreeze(arr)
    console.log(frozen)

    const mutate = () => frozen.push(1)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.CANT_ADD_PROP('3'))
  })

  it('freezes-the-array-inplace', () => {
    const frozen = deepFreeze([0, 1, 2], true)
    const mutate = () => (frozen[0] = 1)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('0', '[object Array]'))
  })
  it('freezes-the-indexes-in-the-array-of-objects', () => {
    const arr = [{ a: 1 }]
    const frozen = deepFreeze(arr)
    let mutate = () => (frozen[0] = 1)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('0', '[object Array]'))

    mutate = () => (frozen[0].a = 1)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('a'))
  })
  it('freezes-the-indexes-in-the-array-of-objects-inplace', () => {
    const frozen = deepFreeze([{ a: 1 }], true)
    let mutate = () => (frozen[0] = 1)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('0', '[object Array]'))

    mutate = () => (frozen[0].a = 1)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('a'))
  })
  it('deep-freezes-the-indexes-in-the-array-of-objects', () => {
    const arr = [{ b: { c: 2, d: [3, { e: 4 }] } }]
    const frozen = deepFreeze(arr)

    let mutate = () => (frozen[0].b.c = 5)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('c'))

    mutate = () => (frozen[0].b.d = 5)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('d'))

    mutate = () => (frozen[0].b.d[0] = 5)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('0', '[object Array]'))

    mutate = () => (frozen[0].b.d[1] = 5)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('1', '[object Array]'))

    mutate = () => (frozen[0].b.d[1].e = 5)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('e'))
  })
  it('deep-freezes-the-indexes-in-the-array-of-objects-inplace', () => {
    const frozen = deepFreeze([{ b: { c: 2, d: [3, { e: 4 }] } }])

    let mutate = () => (frozen[0].b.c = 5)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('c'))

    mutate = () => (frozen[0].b.d = 5)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('d'))

    mutate = () => (frozen[0].b.d[0] = 5)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('0', '[object Array]'))

    mutate = () => (frozen[0].b.d[1] = 5)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('1', '[object Array]'))

    mutate = () => (frozen[0].b.d[1].e = 5)
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.READ_ONLY('e'))
  })
})

describe('deepFreeze:prototype', () => {
  it('freezes-prototype-object', () => {
    const a = { a: 1 }
    const frozen = deepFreeze(a)
    const mutate = () => (frozen.__proto__ = { c: 2 })
    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.NOT_EXTENSIBLE())
  })
  it('makes-prototype-object-non-extensible', () => {
    const a = { a: 1 }
    const frozen = deepFreeze(a)
    const mutate = () => (frozen.__proto__.b = { c: 2 })

    expect(mutate).toThrow(TypeError)
    expect(mutate).toThrowError(ERRORS.CANT_ADD_PROP('b'))
  })
})

const ERRORS = {
  READ_ONLY: (prop, obj = '#<Object>') =>
    `Cannot assign to read only property '${prop}' of object '${obj}'`,
  CANT_ADD_PROP: prop =>
    `Cannot add property ${prop}, object is not extensible`,
  NOT_EXTENSIBLE: (obj = '#<Object>') => `${obj} is not extensible`,
  CANT_DEL_PROP: (prop, obj = '#<Object>') =>
    `Cannot delete property '${prop}' of ${obj}`
}
