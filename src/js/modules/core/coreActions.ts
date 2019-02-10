import { db, auth, provider, storage } from "../../firebase";
import { push } from "connected-react-router";

import { UNRESTRICTED_ROUTES } from "../constants";
import { ReduxState } from "../../reducers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { User } from "firebase";
import { ApplyFormData, ConfirmationFormData, IncompleteField } from "../types";
import DocumentData = firebase.firestore.DocumentData;

type ThunkResult<R> = ThunkAction<R, ReduxState, undefined, Action>;

export const REFRESH_WINDOW_DIMENSIONS = "core/REFRESH_WINDOW_DIMENSIONS";

export const SUBMIT_CONFIRM_PENDING = "core/SUBMIT_CONFIRM_PENDING";
export const SUBMIT_CONFIRM_FULFILLED = "core/SUBMIT_CONFIRM_FULFILLED";
export const SUBMIT_CONFIRM_REJECTED = "core/SUBMIT_CONFIRM_REJECTED";

export const SUBMIT_APP_PENDING = "core/SUBMIT_APP_PENDING";
export const SUBMIT_APP_FULFILLED = "core/SUBMIT_APP_FULFILLED";
export const SUBMIT_APP_REJECTED = "core/SUBMIT_APP_REJECTED";

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

export const UPLOAD_RESUME_PENDING = "core/UPLOAD_RESUME_PENDING";
export const UPLOAD_RESUME_FULFILLED = "core/UPLOAD_RESUME_FULFILLED";
export const UPLOAD_RESUME_REJECTED = "core/UPLOAD_RESUME_REJECTED";

export const GET_FORM_DATA_FULFILLED = "core/GET_FORM_DATA_FULFILLED";
export const GET_FORM_DATA_REJECTED = "core/GET_FORM_DATA_REJECTED";

export const ADD_USER = "core/ADD_USER";
export const DELETE_USER = "core/DELETE_USER";

export const LOADING_FULFILLED = "core/LOADING_FULFILLED";
export const LOADING_REJECTED = "core/LOADING_REJECTED";

export const UPLOAD_PROFILE_PICTURE_PENDING =
  "core/UPLOAD_PROFILE_PICTURE_PENDING";

export const UPLOAD_PROFILE_PICTURE_REJECTED =
  "core/UPLOAD_PROFILE_PICTURE_REJECTED";

export const UPLOAD_PROFILE_PICTURE_FULFILLED =
  "core/UPLOAD_PROFILE_PICTURE_FULFILLED";

export const refreshWindowDimensions = () => ({
  type: REFRESH_WINDOW_DIMENSIONS,
  payload: {}
});

const getUserData = (user: User): ThunkResult<void> => (
  dispatch: ThunkDispatch<ReduxState, undefined, any>
) => {
  let data: any;
  db.collection("users")
    .doc(user.uid)
    .get()
    .then(doc => {
      // If the user is new, there won't be any data,
      // so we need a default of empty object
      data = doc.data() || {};
      return db
        .collection("admitted")
        .doc(user.uid)
        .get();
    })
    .then(doc => {
      data.isAdmitted = doc.exists;
      dispatch({ type: GET_FORM_DATA_FULFILLED, payload: data });
      dispatch({ type: LOADING_FULFILLED });
    })
    .catch(err => {
      dispatch({ type: GET_FORM_DATA_REJECTED, payload: err });
      dispatch({
        type: LOADING_REJECTED
      });
    });
};

export const loadInitialState = (location: Location): ThunkResult<void> => (
  dispatch: ThunkDispatch<ReduxState, undefined, any>
) => {
  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        type: ADD_USER,
        payload: user
      });
      dispatch(getUserData(user));
    } else {
      // If not in the routes that are unrestricted,
      // redirect to login. I'm filtering by unrestricted
      // because I'd prefer to accidentally redirect to login
      // versus accidentally showing restricted pages
      if (!UNRESTRICTED_ROUTES.has(location.pathname)) {
        dispatch(push("/login"));
      }
      dispatch({
        type: DELETE_USER
      });
      dispatch({
        type: LOADING_FULFILLED
      });
    }
  });
};

export const uploadResume = (uid: string, file: File): ThunkResult<void> => (
  dispatch: ThunkDispatch<ReduxState, undefined, any>
) => {
  dispatch({
    type: UPLOAD_RESUME_PENDING
  });
  if (file.type !== "application/pdf") {
    dispatch({
      type: UPLOAD_RESUME_REJECTED,
      payload: { message: "Invalid file type, resume must be a PDF" }
    });
    return;
  }

  const resumeTimestamp = new Date().toLocaleString();
  const storageRef = storage.ref();
  const resumeRef = storageRef.child(`users/${uid}/resume.pdf`);
  return resumeRef
    .put(file)
    .then(() => {
      return db
        .collection("users")
        .doc(uid)
        .set({ resumeTimestamp }, { merge: true })
        .then(() => resumeTimestamp);
    })
    .then(timestamp => {
      dispatch({
        type: UPLOAD_RESUME_FULFILLED,
        payload: { message: "Resume successfully uploaded", resumeTimestamp }
      });

      return timestamp;
    })
    .catch(err => dispatch({ type: UPLOAD_RESUME_REJECTED, payload: err }));
};

export const submitApp = (
  appValues: ApplyFormData,
  incompleteFields: IncompleteField[]
) => (dispatch: ThunkDispatch<ReduxState, undefined, any>) => {
  if (!auth.currentUser) {
    dispatch({
      type: SUBMIT_APP_REJECTED,
      payload: "Not logged in, please log in to submit app"
    });
    dispatch(push("/login"));
    return;
  }

  const uid = auth.currentUser.uid;
  const currentTime = new Date();
  let message: string, data: any;
  // If form is complete
  if (incompleteFields.length !== 0) {
    const readify = (list: IncompleteField[]) =>
      list.map(val => val.name).join(", ");
    data = appValues;
    message =
      "Application saved but NOT complete. Missing: " +
      readify(incompleteFields);
  } else {
    data = {
      submitTimestamp: currentTime,
      ...appValues
    };
    message = `Application submitted at ${currentTime.toLocaleString()}. \
  Feel free to resubmit at any time.`;
  }

  dispatch({
    type: SUBMIT_APP_PENDING
  });
  return db
    .collection("users")
    .doc(uid)
    .set(data)
    .then(() => {
      dispatch({
        type: SUBMIT_APP_FULFILLED,
        payload: { message, ...data }
      });
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    })
    .catch(err =>
      dispatch({
        type: SUBMIT_APP_REJECTED,
        payload: err
      })
    );
};

export const declineConfirmation = () => {
  return submitConfirmation({
    location: 'cannot-attend',
    nyuCodeOfConduct: false,
    nyuPrivacyPolicy: false,
    nyuMediaRights: false
  });
}

export const submitConfirmation = (formValues: ConfirmationFormData) => (
  dispatch: ThunkDispatch<ReduxState, undefined, any>
) => {
  if (!auth.currentUser) {
    dispatch({
      type: SUBMIT_CONFIRM_REJECTED,
      payload: "Not logged in, please log in to confirm"
    });
    dispatch(push("/login"));
    return;
  }

  const uid = auth.currentUser.uid;
  const confirmTimestamp = new Date();

  dispatch({
    type: SUBMIT_CONFIRM_PENDING
  });
  return db
    .collection("users")
    .doc(uid)
    .set({ confirmData: formValues, confirmTimestamp }, { merge: true })
    .then(() => {
      dispatch({
        type: SUBMIT_CONFIRM_FULFILLED,
        payload: {
          message: "Confirmation submitted.",
          data: { formData: formValues, confirmTimestamp }
        }
      });
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    })
    .catch(err =>
      dispatch({
        type: SUBMIT_CONFIRM_REJECTED,
        payload: err
      })
    );
};

export const logout = () => (
  dispatch: ThunkDispatch<ReduxState, undefined, any>
) => {
  auth
    .signOut()
    .then(() => {
      dispatch(push("/"));
      dispatch({
        type: LOGOUT_FULFILLED,
        payload: "Successfully logged out"
      });
    })
    .catch(err => {
      dispatch({
        type: LOGOUT_REJECTED,
        payload: err
      });
    });
};

// Directly add user for rehydrating from localStorage
export const addUser = (user: User) => ({
  type: ADD_USER,
  payload: user
});

export const deleteUser = () => ({
  type: DELETE_USER
});

export const loginWithPassword = ({
  password,
  email
}: {
  password: string;
  email: string;
}) => (dispatch: ThunkDispatch<ReduxState, undefined, any>) => {
  dispatch({ type: LOGIN_PENDING });
  auth
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      const { user } = result;
      dispatch({
        type: LOGIN_FULFILLED,
        payload: user
      });
      return dispatch(getUserData(user));
    })
    .then(() => {
      dispatch(push("/apply"));
    })
    .catch(err => {
      dispatch({
        type: LOGIN_REJECTED,
        payload: err
      });
    });
};

export const loginWithGoogle = () => (
  dispatch: ThunkDispatch<ReduxState, undefined, any>
) => {
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

export const register = ({
  email,
  password
}: {
  email: string;
  password: string;
}) => (dispatch: ThunkDispatch<ReduxState, undefined, any>) => {
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

export const resetPassword = (email: string) => (
  dispatch: ThunkDispatch<ReduxState, undefined, any>
) => {
  dispatch({ type: RESET_PASSWORD_PENDING });
  auth
    .sendPasswordResetEmail(email)
    .then(result => {
      dispatch(push("/"));
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

export const updatePassword = (password: string) => (
  dispatch: ThunkDispatch<ReduxState, undefined, any>
) => {
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

export const clearError = (errorType: string) => ({
  type: CLEAR_ERROR,
  payload: errorType
});

export const clearNotification = (errorType: string) => ({
  type: CLEAR_NOTIFICATION,
  payload: errorType
});

export const uploadProfilePic = (file: File, uid: string) => (
  dispatch: ThunkDispatch<ReduxState, undefined, any>
) => {
  dispatch({ type: UPLOAD_PROFILE_PICTURE_PENDING });
  const validFileTypes = new Set(["image/png", "image/jpg", "image/jpeg"]);

  if (validFileTypes.has(file.type)) {
    const ext = file.name.split(".").pop();
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`users/${uid}/profile.${ext}`);
    let photoURL: string;
    imageRef
      .put(file)
      .then(() => imageRef.getDownloadURL())
      .then(url => {
        photoURL = url;
        return auth.currentUser.updateProfile({
          photoURL: url,
          displayName: auth.currentUser.displayName
        });
      })
      .then(() => {
        dispatch({
          type: UPLOAD_PROFILE_PICTURE_FULFILLED,
          payload: photoURL
        });
      })
      .catch(err => {
        dispatch({
          type: UPLOAD_PROFILE_PICTURE_REJECTED,
          payload: err
        });
      });
  } else {
    dispatch({
      type: UPLOAD_PROFILE_PICTURE_REJECTED,
      payload: "Invalid file type " + file.type.split("/").pop()
    });
  }
};
