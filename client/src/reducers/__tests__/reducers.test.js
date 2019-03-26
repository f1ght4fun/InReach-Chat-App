import ChatReducer from '../chat-reducer'
import * as types from '../../actions/action-types'

// Tests for reducers
describe(">>>Chat App Reducers", () => {
    it("+++should get a default state", () => {
        expect(ChatReducer(undefined, {})).toEqual(
          {
            loading: false, 
            err: null,
            username: null,
            chatHistory: []
          }
        )
      })
    
    it("+++should handle REGISTER_SUCCESS", () => {
            expect(
              ChatReducer(undefined, {
                type: types.REGISTER_SUCCESS,
                payload: 'userName'
              })
            ).toEqual({
                loading: false, 
                err: null,
                username: 'userName',
                chatHistory: []
            })
        
    })

    it("+++should handle MESSAGE_START and MESSAGE_SUCCESS", () => {

        const initialState = {
            loading: false, 
            err: null,
            username: 'user2',
            chatHistory: [{message:'message.one', username:'user1'}]
        }

        expect(
          ChatReducer(initialState, {
            type: types.MESSAGE_START
          })
        ).toEqual({
            loading: true, 
            err: null,
            username: 'user2',
            chatHistory: [{message:'message.one', username:'user1'}]
        })

        expect(
            ChatReducer(initialState, {
              type: types.MESSAGE_SUCCESS,
              payload: [{message:'message.two', username:'user2'}]
            })
          ).toEqual({
              loading: false, 
              err: null,
              username: 'user2',
              chatHistory: [{message:'message.one', username:'user1'},{message:'message.two', username:'user2'}]
          })
    })
});