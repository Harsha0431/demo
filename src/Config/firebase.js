// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-UPR68MC7X-gJ_U9v_ZD_-tR77IvPoNE",
  authDomain: "sharewithme-88880.firebaseapp.com",
  projectId: "sharewithme-88880",
  storageBucket: "sharewithme-88880.appspot.com",
  messagingSenderId: "472448853918",
  appId: "1:472448853918:web:569a8616dac8ac92f5588f",
  measurementId: "G-VVR4TZ8WJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app) ;
export default storage ;



























// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries


// const firebaseConfig = {
//   apiKey: "AIzaSyC-UPR68MC7X-gJ_U9v_ZD_-tR77IvPoNE",
//   authDomain: "sharewithme-88880.firebaseapp.com",
//   projectId: "sharewithme-88880",
//   storageBucket: "sharewithme-88880.appspot.com",
//   messagingSenderId: "472448853918",
//   appId: "1:472448853918:web:569a8616dac8ac92f5588f",
//   measurementId: "G-VVR4TZ8WJ1"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);

