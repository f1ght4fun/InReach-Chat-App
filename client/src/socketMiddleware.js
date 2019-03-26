import io from 'socket.io-client' 
import { push } from 'connected-react-router'
import {
    REGISTER,
    REGISTER_START,
    REGISTER_ERROR,
    REGISTER_SUCCESS,
    MESSAGE,
    MESSAGE_START,
    MESSAGE_SUCCESS,
    HISTORY,
    LEAVE,
    LEAVE_SUCCESS
  } from './actions/action-types';
  
let socket;
export const createSocketMiddleWare = url => store => {

    if (!socket) {
        socket = io(url);

        socket.on("message", (message) => {
            store.dispatch({
                type : MESSAGE_SUCCESS,
                payload : [message]
            });
        });
    }

    return next => action => {
        switch(action.type) {
            case REGISTER : {
                store.dispatch({
                    type: REGISTER_START
                })    

                socket.emit(REGISTER, action.payload, (err) => {
                    if (err) {
                        store.dispatch({
                            type: REGISTER_ERROR,
                            payload : {err: err}
                        })
                    }
                    else {
                        store.dispatch({
                            type: REGISTER_SUCCESS,
                            payload : action.payload
                        })

                        store.dispatch(push('/chat'))
                    }
                })
                
                return;
            }

            case LEAVE : {
                socket.emit(LEAVE, () => {
                    store.dispatch({
                        type: LEAVE_SUCCESS
                    })

                    store.dispatch(push('/register'))
                })
                
                return;
            }

            case HISTORY : {
                socket.emit(HISTORY, (chatHistory) => {
                    store.dispatch({
                        type: MESSAGE_SUCCESS,
                        payload : chatHistory
                    })
                })
                
                return;
            }

            case MESSAGE: {
                store.dispatch({
                    type: MESSAGE_START
                })  

                socket.send(action.payload)

                return;
            }

            default:
                return next(action);

        }
    }
}