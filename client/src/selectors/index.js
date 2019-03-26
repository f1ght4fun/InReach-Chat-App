
export const getRegisterState = ({chat}) => {
  return {
    username: chat.username,
    err: chat.err,
    loading: chat.loading
  }
}


export const getChatState = ({chat}) => {
  return {
    username: chat.username,
    err: chat.err,
    loading: chat.loading,
    history: chat.chatHistory
  }
}