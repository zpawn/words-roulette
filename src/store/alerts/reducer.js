import _cloneDeep from "lodash/cloneDeep";
import _isEmpty from "lodash/isEmpty";

import { actionTypes } from "./index";

////

const INIT_STATE = {
  items: null
};

const alertAdd = (state, { alert }) => {
  const updated = _cloneDeep(state);
  updated.items.push(alert);
  return updated;
};

const alertRemove = (state, { id }) => {
  if (!_isEmpty(state.items)) {
    return state.items.filter(item => item.id !== id);
  }

  return state;
};

const alertsClear = state => ({
  ...state,
  items: null
});

////

export const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionTypes.ALERT_ADD:
      return alertAdd(state, action);
    case actionTypes.ALERT_REMOVE:
      return alertRemove(state, action);
    case actionTypes.ALERTS_CLEAR:
      return alertsClear(state, action);
    default:
      return state;
  }
};
