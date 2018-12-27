import { auth, provider } from "../../firebase";
import { push } from "connected-react-router";
import { delay } from "../utils";
export const REFRESH_WINDOW_DIMENSIONS = "core/REFRESH_WINDOW_DIMENSIONS";

export const LOGIN_PENDING = "core/LOGIN_PENDING";
export const LOGIN_FULFILLED = "core/LOGIN_FULFILLED";
export const LOGIN_REJECTED = "core/LOGIN_REJECTED";

export const REGISTER_PENDING = "core/REGISTER_PENDING";
export const REGISTER_FULFILLED = "core/REGISTER_FULFILLED";
export const REGISTER_REJECTED = "core/REGISTER_REJECTED";

export const LOGOUT_FULFILLED = "core/LOGOUT_FULFILLED";
export const LOGOUT_REJECTED = "core/LOGOUT_REJECTED";

export const RESET_PASSWORD_PENDING = "core/RESET_PASSWORD_PENDING";
export const RESET_PASSWORD_FULFILLED = "core/RESET_PASSWORD_FULFILLED";
export const RESET_PASSWORD_REJECTED = "core/RESET_PASSWORD_REJECTED";

export const UPDATE_PASSWORD_PENDING = "core/UPDATE_PASSWORD_PENDING";
export const UPDATE_PASSWORD_FULFILLED = "core/UPDATE_PASSWORD_FULFILLED";
export const UPDATE_PASSWORD_REJECTED = "core/UPDATE_PASSWORD_REJECTED";

export const CLEAR_EMAIL_STATE = "core/CLEAR_EMAIL_STATE";

export const CLEAR_ERROR = "core/CLEAR_ERROR";
export const CLEAR_NOTIFICATION = "core/CLEAR_NOTIFICATION";

export const ADD_USER = "core/ADD_USER";
export const DELETE_USER = "core/DELETE_USER";

export const refreshWindowDimensions = () => ({
  type: REFRESH_WINDOW_DIMENSIONS,
  payload: {}
});

export const logout = () => dispatch => {
  auth
    .signOut()
    .then(() => {
      dispatch({
        type: LOGOUT_FULFILLED
      });
      dispatch(push("/"));
    })
    .catch(err => {
      dispatch({
        type: LOGOUT_REJECTED,
        payload: err
      });
    });
};

// Directly add user for rehydrating from localStorage
export const addUser = user => ({
  type: ADD_USER,
  payload: user
});

export const deleteUser = () => ({
  type: DELETE_USER
});

export const loginWithPassword = ({ password, email }) => dispatch => {
  dispatch({ type: LOGIN_PENDING });
  auth
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      const { user } = result;
      dispatch({
        type: LOGIN_FULFILLED,
        payload: user
      });
      dispatch(push("/apply"));
    })
    .catch(err => {
      dispatch({
        type: LOGIN_REJECTED,
        payload: err
      });
    });
};

export const loginWithGoogle = () => dispatch => {
  dispatch({ type: LOGIN_PENDING });
  auth
    .signInWithPopup(provider)
    .then(result => {
      const { user } = result;
      dispatch({
        type: LOGIN_FULFILLED,
        payload: user
      });
      dispatch(push("/apply"));
    })
    .catch(err => {
      dispatch({
        type: LOGIN_REJECTED,
        payload: err
      });
    });
};

export const register = ({ email, password }) => dispatch => {
  dispatch({ type: REGISTER_PENDING });
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      const { user } = result;
      dispatch({
        type: REGISTER_FULFILLED,
        payload: user
      });
      dispatch(push("/apply"));
    })
    .catch(err => {
      dispatch({
        type: REGISTER_REJECTED,
        payload: err
      });
    });
};

export const resetPassword = email => dispatch => {
  dispatch({ type: RESET_PASSWORD_PENDING });
  auth
    .sendPasswordResetEmail(email)
    .then(result => {
      dispatch({
        type: RESET_PASSWORD_FULFILLED,
        payload: result
      });
    })
    .catch(err => {
      dispatch({
        type: RESET_PASSWORD_REJECTED,
        payload: err
      });
    });
};

export const updatePassword = password => dispatch => {
  dispatch({ type: UPDATE_PASSWORD_PENDING });
  auth.currentUser
    .updatePassword(password)
    .then(() => {
      dispatch({ type: UPDATE_PASSWORD_FULFILLED });
      dispatch(push("/"));
    })
    .catch(err => dispatch({ type: UPDATE_PASSWORD_REJECTED, payload: err }));
};

export const clearEmailState = () => ({
  type: CLEAR_EMAIL_STATE
});

export const clearError = errorType => ({
  type: CLEAR_ERROR,
  payload: errorType
});

export const clearNotification = errorType => ({
  type: CLEAR_NOTIFICATION,
  payload: errorType
});
