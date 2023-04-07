import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// console.log( process.env.REACT_APP_API_KEY);
// const firebaseConfig =
// {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID,
//     measurementId: process.env.REACT_APP_MEASUREMENT_ID

// }

const firebaseConfig = {
    apiKey: "AIzaSyBVWJnF6gPjo4sWYtS603eebEOWT_A_bLU",
    authDomain: "typing-74727.firebaseapp.com",
    projectId: "typing-74727",
    storageBucket: "typing-74727.appspot.com",
    messagingSenderId: "215554302867",
    appId: "1:215554302867:web:d2f10b3d8ef7a1ae307e66",
    measurementId: "G-MGGKBJE24F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db=firebaseApp.firestore();

export { auth ,db};