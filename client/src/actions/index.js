import {
  REGISTER,
  MESSAGE,
  HISTORY,
  LEAVE
} from './action-types';

export const register = (username) => {
  return {
    type: REGISTER,
    payload: username
  }
};

export const sendMessage = (message) => {
  return {
    type: MESSAGE,
    payload: message
  }
};

export const getHistory = () => {
  return {
    type: HISTORY
  }
};

export const leave = () => {
  return {
    type: LEAVE
  }
};