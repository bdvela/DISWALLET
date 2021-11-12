import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyBpDR5igsDHRhHHAWDbHgU9H5RhRH0O7AQ",
  authDomain: "diswallet-sx62.firebaseapp.com",
  projectId: "diswallet-sx62",
  storageBucket: "diswallet-sx62.appspot.com",
  messagingSenderId: "747150280699",
  appId: "1:747150280699:web:7b801e231fc29045fa6d5e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.database();