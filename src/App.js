import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";

import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userAction";

import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";

import "./App.css";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Axios from "axios";
import dayjs from "dayjs";

const theme = createMuiTheme(themeFile);

Axios.defaults.baseURL =
  "https://us-central1-social-app-32027.cloudfunctions.net/api";

const token = localStorage.getItem("FBIdToken");
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    Axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  dayjs.locale("pt-br");
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar></Navbar>
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}></Route>
              <AuthRoute exact path="/login" component={login}></AuthRoute>
              <AuthRoute exact path="/signup" component={signup}></AuthRoute>
              <Route exact path="/users/:handle" component={user}></Route>
              <Route
                exact
                path="/users/:handle/scream/:screamId"
                component={user}
              ></Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
