import * as Actions from "../actions"

const initialState = {
  showDialog: false,
  dialogType: null,
  dialogMessage: ""
};

const ui = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SHOW_MESSAGE: {
      const dialogOptions = action.payload
      console.log(dialogOptions)
      return {
        ...state,
        showDialog: true,
        dialogType: dialogOptions.alertType,
        dialogMessage: dialogOptions.message
      }
    }

    case Actions.HIDE_MESSAGE: {
      return {
        ...state,
        showDialog: false
      }
    }

    default: {
      return state;
    }
  }
};

export default ui;