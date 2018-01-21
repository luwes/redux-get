import { get as getPath, defaultTo, is, isPlainObject, memoize } from './utils'

export function createGetters(selectorsMap = {}) {
  return createStore => (...args) => {
    const store = createStore(...args)

    function getSelectors() {
      return selectorsMap
    }

    /**
     * Create a property selector function based on a selector or dot path.
     * This needs to return the same function for the same argument.
     * @param  {Function|String|Array} selector function or path of property
     * @return {Function} property selector
     */
    const createGetter = memoize(paths => {
      const selector = getPath(paths, getSelectors())
      if (is(Function, selector)) {
        return selector
      }
      return state => getPath(paths, state)
    })

    /**
     * Get a store value based on a selector
     * @param  {Object} selector     can be dot path string or function
     * @param  {Object} defaultValue value to return if the selector returns null
     * @return {Object}              selected value in the store
     */
    function get(selector, defaultValue) {
      selector = is(Function, selector) ? selector : createGetter(selector)
      const value = defaultTo(defaultValue, selector(store.getState()))
      return value !== undefined ? value : notexist(selector) || value
    }

    function notexist(s) {
      return console.warn(`${s.toString()} does not exist in the store.`)
    }

    return { ...store, getSelectors, createGetter, get }
  }
}

/**
 * Bind props of getState and selectors to a model like object.
 * @param  {Array} props      array with paths or props map
 * @param  {Function} getter  the getter function to use, e.g. `store.get`
 * @return {Object}           bound object with state props and selectors
 *
 * @example
 *
 *      const props = bindProps([
 *        'ui.video',
 *        { previewWidth: 'ui.preview.width,' }
 *      ], store.get)
 *
 *      props.duration // 60
 *      props.isPlaying // true
 *      props.previewWidth // 480
 *
 */
export function bindProps(props, getter) {
  const mapStateToProps = props.reduce((acc, path) => {
    return Object.assign(
      acc,
      isPlainObject(path) ? path : createModel(path, getter)
    )
  }, {})

  return Object.keys(mapStateToProps).reduce((acc, key) => {
    const selector = mapStateToProps[key]
    return Object.defineProperty(acc, key, {
      get: () => getter(selector)
    })
  }, {})
}

function createModel(path, getter) {
  const props = getter(path)
  return Object.keys(props).reduce((acc, key) => {
    acc[key] = `${path}.${key}`
    return acc
  }, {})
}
