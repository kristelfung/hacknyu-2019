import { Provider } from "react-redux";
import React, { Component } from "react";
import { Route } from "react-router-dom";
import appHistory from "tools/appHistory";
import MainApp from "./core/components/MainApp";
import HomePage from "./core/components/HomePage";
import SignUpPage from "./core/components/SignUpPage";
import { ConnectedRouter } from "react-router-redux";
import store from "../store";
import ThemeInjector from "./ThemeInjector";
import ApplyPage from './core/components/ApplyPage'
import LoginPage from './core/components/LoginPage'

class RoutingApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={appHistory}>
          <ThemeInjector>
            <MainApp>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/apply" component={ApplyPage} />
            </MainApp>
          </ThemeInjector>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default RoutingApp;
