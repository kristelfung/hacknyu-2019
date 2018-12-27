import {
  ADD_USER,
  CLEAR_EMAIL_STATE,
  CLEAR_ERROR,
  CLEAR_NOTIFICATION,
  DELETE_USER,
  LOCATION_CHANGE,
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
  RESET_PASSWORD_FULFILLED,
  RESET_PASSWORD_REJECTED,
  REFRESH_WINDOW_DIMENSIONS,
  REGISTER_FULFILLED,
  REGISTER_PENDING,
  REGISTER_REJECTED,
  UPDATE_PASSWORD_FULFILLED,
  UPDATE_PASSWORD_REJECTED,
  UPDATE_PASSWORD_PENDING,
  RESET_PASSWORD_PENDING
} from "./coreActions";

// getWindowWidth & getWindowHeight was
// adapted from http://stackoverflow.com/a/8876069/1291659
const getViewportWidth = () => {
  return (
    Math.max(window.document.documentElement.clientWidth, window.innerWidth) ||
    0
  );
};

const getViewportHeight = () => {
  return (
    Math.max(
      window.document.documentElement.clientHeight,
      window.innerHeight
    ) || 0
  );
};

const initialState = {
  viewportWidth: getViewportWidth(),
  viewportHeight: getViewportHeight(),
  user: {},
  errors: {},
  notifications: {},
  loginForm: { isSubmitting: false },
  registerForm: { isSubmitting: false },
  resetPasswordForm: { isSubmitting: false },
  updatePasswordForm: { isSubmitting: false },
  passwordEmailSent: false
};

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case REFRESH_WINDOW_DIMENSIONS:
      let viewportWidth = getViewportWidth(),
        viewportHeight = getViewportHeight();

      if (
        state.viewportWidth !== viewportWidth ||
        state.viewportHeight !== viewportHeight
      ) {
        // override width/height which will refresh app view
        return Object.assign({ ...state }, { viewportWidth, viewportHeight });
      } else return state; //otherwise do not mutate
    case LOGIN_PENDING:
      return {
        ...state,
        loginForm: { isSubmitting: true }
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        user: action.payload,
        loginForm: { isSubmitting: false },
        notifications: {
          ...state.notifications,
          login: "Successfully logged in"
        }
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        loginForm: { isSubmitting: false },
        errors: { ...state.errors, login: action.payload.message }
      };
    case LOGOUT_FULFILLED:
      return {
        ...state,
        user: undefined,
        notifications: {
          ...state.notifications,
          logout: "Successfully logged out"
        }
      };
    case LOGOUT_REJECTED:
      return {
        ...state,
        errors: { ...state.errors, logout: action.payload.message }
      };
    case REGISTER_PENDING:
      return {
        ...state,
        registerForm: { isSubmitting: true }
      };
    case REGISTER_REJECTED:
      return {
        ...state,
        registerForm: { isSubmitting: false },
        errors: { ...state.errors, register: action.payload.message }
      };
    case REGISTER_FULFILLED:
      return {
        ...state,
        user: action.payload,
        registerForm: { isSubmitting: false },
        notifications: {
          ...state.notifications,
          register: "New user registered!"
        }
      };
    case RESET_PASSWORD_PENDING:
      return {
        ...state,
        resetPasswordForm: { isSubmitting: true }
      };
    case RESET_PASSWORD_FULFILLED:
      return {
        ...state,
        passwordEmailSent: true,
        resetPasswordForm: { isSubmitting: false }
      };
    case RESET_PASSWORD_REJECTED:
      return {
        ...state,
        errors: {
          ...state.errors,
          passwordEmail: action.payload.message,
          resetPasswordForm: { isSubmitting: false }
        }
      };
    case UPDATE_PASSWORD_PENDING:
      return {
        ...state,
        updatePasswordForm: { isSubmitting: true }
      };
    case UPDATE_PASSWORD_FULFILLED:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          updatePassword: "Password successfully updated"
        },
        updatePasswordForm: { isSubmitting: false }
      };
    case UPDATE_PASSWORD_REJECTED:
      return {
        ...state,
        errors: { ...state.errors, updatePassword: action.payload.message },
        updatePasswordForm: { isSubmitting: false }
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        user: undefined
      };
    case CLEAR_EMAIL_STATE:
      return { ...state, passwordEmailSent: false };
    case CLEAR_ERROR:
      const newErrors = { ...state.errors };
      delete newErrors[action.payload];
      return {
        ...state,
        errors: newErrors
      };
    case CLEAR_NOTIFICATION:
      const newNotifications = { ...state.errors };
      delete newNotifications[action.payload];
      return {
        ...state,
        notifications: newNotifications
      };
    default:
      break;
  }

  return state;
};

export default reducer;
