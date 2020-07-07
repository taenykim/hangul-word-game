import { combineReducers } from "redux";
import words from "./words";

const rootReducer = combineReducers({
  words,
});

export default rootReducer;
