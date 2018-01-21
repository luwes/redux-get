# Redux Get

[![Build Status](https://travis-ci.org/luwes/redux-get.svg?branch=master)](https://travis-ci.org/luwes/redux-get)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Redux enhancer to access state props and selectors via a simple store.get() method.

## Install

```
npm i --save redux-get
```

## API

`createGetters(selectors)`

**selectors**  
A single map containing all the selectors with a similar shape as your reducer.

`store.get(selector)`

**selector**
A selector `function`, `object.dot.path` or `['array', 'path']`.

Returns the store value.

`store.getSelectors()`

Returns the selectors map.

`store.createGetter(paths)`
A selector `object.dot.path` or `['array', 'path']`.

Returns a selector function.

## Usage

```js
const store = createStore(reducer, createGetters(selectors))
```
