import * as actions from '../index'
import * as types from '../action-types'

describe('>>> Chat App Actions', () => {
  it('+++should create an action to register', () => {
    const username = 'testUsername'
    const expectedAction = {
      type: types.REGISTER,
      payload: username
    }
    expect(actions.register(username)).toEqual(expectedAction)
  })

  it('+++should create an action to send message', () => {
    const message = 'i am a test message'
    const expectedAction = {
      type: types.MESSAGE,
      payload: message
    }
    expect(actions.sendMessage(message)).toEqual(expectedAction)
  })

  it('+++should create an action to get history messages', () => {
    const expectedAction = {
      type: types.HISTORY,
    }
    expect(actions.getHistory()).toEqual(expectedAction)
  })

  it('+++should create an action to sing out user', () => {
    const expectedAction = {
      type: types.LEAVE,
    }
    expect(actions.leave()).toEqual(expectedAction)
  })
})