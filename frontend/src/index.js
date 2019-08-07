import React from "react";
import { render } from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import history from "./history";

import rootReducer from "./reducers";
import { fetchAuthenticated } from "./action/account";

import Root from "./components/Root";
import AccountDragons from "./components/AccountDragons";
import PublicDragons from "./components/PublicDragons";

import "./index.css";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
// https://github.com/jhen0409/react-native-debugger/issues/280

const AuthRoute = props => {
  if (!store.getState().account.signedIn) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  const { component, path } = props;

  return <Route path={path} component={component} />;
};

store.dispatch(fetchAuthenticated()).then(() => {
  // no need for connect because here we have direct access to the store
  render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Root} />
          <AuthRoute path="/account-dragons" component={AccountDragons} />
          <AuthRoute path="/public-dragons" component={PublicDragons} />
        </Switch>
      </Router>
    </Provider>,
    document.querySelector("#root")
  );
});
