# Redux Get

[![Build Status](https://travis-ci.org/luwes/redux-get.svg?branch=master)](https://travis-ci.org/luwes/redux-get)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Redux enhancer to access selectors and state via a simple `store.get()` method via an object path.

## Install

```
npm i --save redux-get
```

## API

`createGetters(selectors)`

**selectors**  
A single map containing all the selectors with a similar shape as your reducer.


## Usage

```js
const store = createStore(reducer, createGetters(selectors))
```
