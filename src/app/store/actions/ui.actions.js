export const SHOW_MESSAGE = "@snackbar/SHOW_MESSAGE";
export const HIDE_MESSAGE = "@snackbar/HIDE_MESSAGE";

export const showMessageDialog = (alertType, message) => {
  return dispatch => {
    dispatch({
       type: SHOW_MESSAGE,
       payload: {
         alertType,
         message
       }
    })
  }
}

export const clearMessageDialog = () => {
  return dispatch => {
    dispatch({
      type: HIDE_MESSAGE
    })
  }
}