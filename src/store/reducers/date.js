import { SET_CURRENT_DATE } from "../actions/date";

const initialState = {
  date: null,
};

const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_DATE:
      const currentDate = new Date().getTime();
      return { date: currentDate };
    default:
      return state;
  }
};

export default dateReducer;
