//combine all the reducers
import { combineReducers } from 'redux'
import { Page } from "./reducers";
import { Fullname } from "./reducers";

const myApp = combineReducers ({
  //Reducers
  Page,
  Fullname
});

export default myApp;
