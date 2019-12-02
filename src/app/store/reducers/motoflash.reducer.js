import * as Actions from "../actions"

const today = new Date().getTime()

const initialState = {
  user: {
    uid: "",
    role: "admin",
    displayName: "Lucas Lima",
    email: "",
    profilePic: ""
  },
  loading: false,
  navMenu: {
    display: true,
    folded: false
  },
  startDate: 0,
  endDate: today
};

const motoflash = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USERDATA: {
      const data = action.payload
      return {
        ...state,
        user: { ...data }
      }
    }


    case Actions.LOADING_ON: {
      const loading = action.payload
      return {
        ...state,
        loading
      };
    }

    case Actions.LOADING_OFF: {
      const loading = action.payload
      return {
        ...state,
        loading
      };
    }

    case Actions.SET_STARTDATE: {
      const startDate = action.payload
      return {
        ...state,
        startDate
      }
    }

    case Actions.SET_ENDDATE: {
      const endDate = action.payload
      return {
        ...state,
        endDate
      }
    }

    case Actions.FOLD_NAVBAR: {
      const status = action.payload
      return {
        ...state,
        navMenu: {
          display: true,
          folded: status
        }
      }
    }

    default: {
      return state;
    }
  }
};

export default motoflash;
