import { combineReducers } from "redux";

import { wordsReducer } from "./words";
import { rouletteReducer } from "./roulette";
import { rouletteSettingsReducer } from "./rouletteSettings";
import { alertsReducer } from "./alerts";
import { authReducer } from "./auth";

////

export default combineReducers({
  words: wordsReducer,
  roulette: rouletteReducer,
  rouletteSettings: rouletteSettingsReducer,
  alerts: alertsReducer,
  auth: authReducer
});
