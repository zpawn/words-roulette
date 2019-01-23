import { combineReducers } from "redux";

import { wordsReducer } from "./words";
import { rouletteReducer } from "./roulette";
import { rouletteSettingsReducer } from "./rouletteSettings";
import { alertsReducer } from "./alerts";

////

export default combineReducers({
  words: wordsReducer,
  roulette: rouletteReducer,
  rouletteSettings: rouletteSettingsReducer,
  alerts: alertsReducer
});
