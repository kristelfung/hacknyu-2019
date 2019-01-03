import {
  ADD_USER,
  CLEAR_EMAIL_STATE,
  CLEAR_ERROR,
  CLEAR_NOTIFICATION,
  DELETE_USER,
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
  RESET_PASSWORD_PENDING,
  UPLOAD_PROFILE_PICTURE_FULFILLED,
  UPLOAD_PROFILE_PICTURE_REJECTED,
  SUBMIT_APP_PENDING,
  SUBMIT_APP_FULFILLED,
  SUBMIT_APP_REJECTED,
  UPLOAD_RESUME_PENDING,
  UPLOAD_RESUME_FULFILLED,
  UPLOAD_RESUME_REJECTED,
  GET_FORM_DATA_FULFILLED,
  GET_FORM_DATA_REJECTED,
  LOADING_FULFILLED,
  LOADING_REJECTED
} from "./coreActions";
import { LoadingStates } from "../types";

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
  user: undefined,
  errors: {},
  notifications: {},
  applyForm: { isSubmitting: false },
  loginForm: { isSubmitting: false },
  registerForm: { isSubmitting: false },
  resumeForm: { isSubmitting: false },
  resetPasswordForm: { isSubmitting: false },
  updatePasswordForm: { isSubmitting: false },
  passwordEmailSent: false,
  loadingState: LoadingStates.Loading
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
    case UPLOAD_RESUME_PENDING:
      return { ...state, resumeForm: { isSubmitting: true } };
    case UPLOAD_RESUME_FULFILLED:
      return {
        ...state,
        resumeForm: { isSubmitting: true },
        notifications: {
          ...state.notifications,
          resume: action.payload
        }
      };
    case UPLOAD_RESUME_REJECTED:
      return {
        ...state,
        errors: { ...state.errors, resume: action.payload.message }
      };
    case SUBMIT_APP_PENDING:
      return {
        ...state,
        applyForm: { isSubmitting: true }
      };
    case SUBMIT_APP_FULFILLED:
      const { message, submitTimestamp, ...formData } = action.payload;
      if (submitTimestamp) {
        return {
          ...state,
          applyForm: {
            ...state.applyForm,
            isSubmitting: false,
            formData,
            submitTimestamp,
          },
          notifications: {
            ...state.notifications,
            apply: message
          }
        };
      }
      return {
        ...state,
        applyForm: {
          ...state.applyForm,
          isSubmitting: false,
          formData,
        },
        notifications: {
          ...state.notifications,
          apply: message
        }
      };
    case SUBMIT_APP_REJECTED:
      return {
        ...state,
        applyForm: { isSubmitting: false },
        errors: { ...state.errors, apply: action.payload.message }
      };
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
          logout: action.payload
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
    case GET_FORM_DATA_FULFILLED:
      if (action.payload) {
        const {
          resumeTimestamp,
          submitTimestamp,
          ...formData
        } = action.payload;
        return {
          ...state,
          applyForm: {
            ...state.applyForm,
            formData,
            resumeTimestamp,
            submitTimestamp
          }
        };
      }
      return state;
    case GET_FORM_DATA_REJECTED:
      return {
        ...state,
        error: {
          ...state.errors,
          apply: action.payload.message
        }
      };
    case LOADING_FULFILLED:
      return {
        ...state,
        loadingState: LoadingStates.Loaded
      };
    case LOADING_REJECTED:
      return {
        ...state,
        loadingState: LoadingStates.Failed
      };
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };
    case DELETE_USER:
      return {
        ...state
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
    case UPLOAD_PROFILE_PICTURE_REJECTED:
      return {
        ...state,
        errors: { ...state.errors, fileError: action.payload }
      };
    case UPLOAD_PROFILE_PICTURE_FULFILLED:
      return {
        ...state,
        user: { ...state.user, photoURL: action.payload }
      };
    default:
      break;
  }

  return state;
};

export default reducer;
