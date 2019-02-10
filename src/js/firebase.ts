// src/firebase.js
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";

const config = {
  apiKey: "AIzaSyCCGrSjWVuB5GqGLfgkfA2uQT1EjX1Sjgc",
  authDomain: "hacknyu-3e0c8.firebaseapp.com",
  databaseURL: "https://hacknyu-3e0c8.firebaseio.com",
  projectId: "hacknyu-3e0c8",
  storageBucket: "hacknyu-3e0c8.appspot.com",
  messagingSenderId: "482443126384"
};
firebase.initializeApp(config);
firebase
  .auth()
  .setPersistence("local")
  .catch((err: string) => {
    console.error(err);
  });
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firestore;
export const storage = firebase.storage();
export const functions = firebase.functions();
