import * as Actions from "../actions"

const initialState = {
  points: [
    {
      point: 0,
      address: {},
      typeDelivery: "collect",
      description: "",
      id: "",
      sequence: 1
    },
    {
      point: 1,
      address: {},
      typeDelivery: "delivery",
      description: "",
      id: "",
      sequence: 1
    }
  ],
  quotation: null,
  status: ""
};

const workOrder = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_ENDDATE: {
      const endDate = action.payload
      return {
        ...state,
        endDate
      }
    }

    default: {
      return state;
    }
  }
};

export default workOrder;