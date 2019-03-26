import {
    REGISTER_START,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    MESSAGE_START,
    MESSAGE_SUCCESS,
    LEAVE_SUCCESS
  } from '../actions/action-types';

  const initialState = { 
      loading: false, 
      err: null,
      username: null,
      chatHistory: []
  };

  export default (state = initialState, { type, payload }) => {
    switch (type) {
     case REGISTER_SUCCESS:
        return Object.assign({}, initialState, {
            username: payload
        });
      case MESSAGE_SUCCESS:
        return {
            ...state,
            chatHistory: [...state.chatHistory, ...payload],
        }
      case REGISTER_START:
      case MESSAGE_START: 
        return {
          ...state, loading: true
        };
      case REGISTER_ERROR:
        return {
            ...state, 
            err: payload.err, 
            loading: false
        };
      case LEAVE_SUCCESS:
        return Object.assign({}, initialState);
      default:
        return state;
    }
  };
  