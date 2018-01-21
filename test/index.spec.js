import { createStore } from 'redux'
import { createGetters } from '../'
import { play, timeUpdate, durationUpdate } from './helpers/actionCreators'
import reducer, * as selectors from './helpers/reducer'

describe('Index', () => {
  describe('createGetters', () => {
    it('returns a function', () => {
      expect(createGetters()).toBeInstanceOf(Function)
    })

    it('store adds new getter methods: get, getSelectors, createGetter', () => {
      const store = createStore(reducer, createGetters(selectors))
      expect(store.get).toBeInstanceOf(Function)
      expect(store.getSelectors).toBeInstanceOf(Function)
      expect(store.createGetter).toBeInstanceOf(Function)
    })

    it('returns the selector as a getter property on the state', () => {
      const store = createStore(reducer, createGetters(selectors))

      expect(store.get(selectors.getDuration)).toBe(100)

      store.dispatch(play())
      const isPlaying = store.createGetter('ui.video.isPlaying')
      expect(store.get(isPlaying)).toBe(true)

      store.dispatch(timeUpdate(34))
      expect(store.get('ui.video.timeUntilEnd')).toBe(66)

      store.dispatch(durationUpdate(35))
      expect(store.get(['ui', 'video', 'timeUntilEnd'])).toBe(1)
    })

    it('returns undefined for not existing props', () => {
      const store = createStore(reducer, createGetters(selectors))
      expect(store.get('not.existing')).toBe(undefined)
    })

    it('returns default value for undefined prop', () => {
      const store = createStore(reducer, createGetters(selectors))
      expect(store.get('not.existing', 999)).toBe(999)
    })

  })
})
