export const OPEN_DIALOG = "@dialog/OPEN_DIALOG";
export const CLOSE_DIALOG = "@dialog/CLOSE_DIALOG";

export const showMessageDialog = (alertType, message) => {
  return dispatch => {
    dispatch({
       type: "OPEN_DIALOG",
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
      type: "CLOSE_DIALOG"
    })
  }
}