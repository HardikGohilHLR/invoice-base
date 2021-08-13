import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCHFRO7jBj5Cc1Olo_uZYXsp_Q46XVPfbc",
    authDomain: "invoice-base.firebaseapp.com",
    projectId: "invoice-base",
    storageBucket: "invoice-base.appspot.com",
    messagingSenderId: "34923896090",
    appId: "1:34923896090:web:7e7f6c612b1605162120a3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
