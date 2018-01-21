# Redux Get

[![Build Status](https://travis-ci.org/luwes/redux-get.svg?branch=master)](https://travis-ci.org/luwes/redux-get)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Redux enhancer to access state props and selectors via a simple store.get() method.

## Install

```
npm i --save redux-get
```

## Usage

### `selectors/ui/index.js`

```js
export function doubleDigits(state) {
  return state.ui.digits * 2
}
```

### `selectors/index.js`

```js
import * as todos from './todos'
import * as ui from './ui'

const selectors = {
  todos,
  ui
}

export default selectors
```

### `app.js`
```js
import reducer from './reducer'
import selectors from './selectors'

const store = createStore(reducer, createGetters(selectors))

console.log(store.get('ui.digits')) // gets the state property, e.g. 22
console.log(store.get('ui.doubleDigits')) // gets the derived state via a selector, e.g. 44
```

## API

`createGetters(selectors)`

**selectors**  
A single map containing all the selectors with a similar shape as your reducer.

`store.get(selector)`

**selector**
A selector `function`, `'object.dot.path'` or `['array', 'path']`.

Returns the store value.

`store.getSelectors()`

Returns the selectors map.

`store.createGetter(paths)`
A selector `'object.dot.path'` or `['array', 'path']`.

Returns a selector function.

## Related

If you would like to access selectors as straight up getters from the state object returned by `store.getState()` have a look at this project https://github.com/luwes/redux-proxy-selectors
