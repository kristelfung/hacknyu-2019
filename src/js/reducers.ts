import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import core from "./modules/core/index";
import { CoreState } from "./modules/core/coreReducer";
import { History } from "history";

export interface ReduxState {
  core: CoreState;
  router: RouterState;
}

export default (history: History) =>
  combineReducers<ReduxState>({
    core: core.reducer,
    router: connectRouter(history)
  });
