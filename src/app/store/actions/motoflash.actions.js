export const LOADING_ON = "@utils/LOADING_ON";
export const LOADING_OFF = "@utils/LOADING_OFF";
export const SET_USERDATA = "@data/SET_USERDATA";
export const SET_STARTDATE = "@table/SET_STARTDATE";
export const SET_ENDDATE = "@table/SET_ENDDATE";
export const FOLD_NAVBAR = "@navbar/FOLD";

export const setUserData = data => {
  return dispatch => {
    dispatch({
      type: SET_USERDATA,
      payload: data
    })
  }
}

export const setLoadingOn = () => {
  return dispatch => {
    dispatch({
      type: LOADING_ON,
      payload: true
    });
  };
}

export const setLoadingOff = () => {
  return dispatch => {
    dispatch({
      type: LOADING_OFF,
      payload: false
    });
  };
}

export const setStartDate = date => {
  return dispatch => {
    dispatch({
      type: SET_STARTDATE,
      payload: date
    })
  }
}

export const setEndDate = date => {
  return dispatch => {
    dispatch({
      type: SET_ENDDATE,
      payload: date
    })
  }
}

export const foldNavbar = () => {
  return (dispatch, getState) => {
    const { folded } = getState().motoflash.navMenu;
    dispatch({
      type: FOLD_NAVBAR,
      payload: !folded
    })
  }
}