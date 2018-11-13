import firebase from 'firebase/app'

// Add additional services that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
require("firebase/functions");

var config = {
  apiKey: "AIzaSyB4eb7R7KDZf2x2tseoebGVmj6vpF8fzls",
  authDomain: "teatro-super-opera.firebaseapp.com",
  databaseURL: "https://teatro-super-opera.firebaseio.com",
  projectId: "teatro-super-opera",
  storageBucket: "teatro-super-opera.appspot.com",
  messagingSenderId: "141314590152"
};

firebase.initializeApp(config);
firebase.firestore().settings({
  timestampsInSnapshots: true
})

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const functions = firebase.functions()

export {
  firebase,
  auth,
  db,
  storage,
  functions
}