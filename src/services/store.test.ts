import {expect ,test} from '@jest/globals'
import { rootReducer } from './store'
import store from './store'

describe('Тест rootReducer', () => {
    test('Тест начального состояния', () => {
        const action = {type: 'UNKNOWN_ACTION'}
        const initialState = rootReducer(undefined, action)
        expect(initialState).toEqual(store.getState())
    })
})

