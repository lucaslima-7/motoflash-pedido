import * as Actions from "../actions"

const initialState = {
  showDialog: false,
  dialogType: "",
  dialogMessage: ""
};

const ui = function (state = initialState, action) {
  switch (action.type) {
    case Actions.OPEN_DIALOG: {
      const dialogOptions = action.payload
      return {
        ...state,
        showDialog: true,
        dialogType: dialogOptions.alertType,
        dialogMessage: dialogOptions.message
      }
    }

    case Actions.CLOSE_DIALOG: {
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