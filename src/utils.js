export function defaultTo(d, val) {
  return val == null ? d : val
}

export function is(Ctor, val) {
  return val != null && (val.constructor === Ctor || val instanceof Ctor)
}

export function isPlainObject(o) {
  return typeof o === 'object' && o.constructor === Object
}

export function includes(search, arr) {
  return arr.indexOf(search) !== -1
}

export function get(paths, obj) {
  if (is(String, paths)) {
    return path(paths.split('.'), obj)
  }
  return path(paths, obj)
}

export function path(paths, obj) {
  let val = obj
  let idx = 0
  while (idx < paths.length) {
    if (val == null) {
      return
    }
    val = val[paths[idx]]
    idx += 1
  }
  return val
}

export function memoize(func) {
  let lastArgs = null
  let lastResult = null
  return function() {
    if (!areArgumentsShallowlyEqual(lastArgs, arguments)) {
      lastResult = func.apply(null, arguments)
    }
    lastArgs = arguments
    return lastResult
  }
}

function areArgumentsShallowlyEqual(prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false
  }
  const length = prev.length
  for (let i = 0; i < length; i++) {
    if (prev[i] !== next[i]) {
      return false
    }
  }
  return true
}
