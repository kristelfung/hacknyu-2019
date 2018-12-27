import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import core from "./modules/core/index";

export default history =>
  combineReducers({
    core: core.reducer,
    router: connectRouter(history)
  });
