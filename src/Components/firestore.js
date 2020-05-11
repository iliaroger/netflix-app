import firebase from 'firebase'; 


var firebaseConfig = {
    apiKey: "AIzaSyA3T6b2qbxawv2iiA8m82T9THnBiomsav4",
    authDomain: "netflixapp-2c830.firebaseapp.com",
    databaseURL: "https://netflixapp-2c830.firebaseio.com",
    projectId: "netflixapp-2c830",
    storageBucket: "netflixapp-2c830.appspot.com",
    messagingSenderId: "348182406191",
    appId: "1:348182406191:web:d74a9f63d7e356a92d12da"
};

firebase.initializeApp(firebaseConfig);


const firestore = {
    auth: firebase.auth(),
    db: firebase.database()
}


export {
    firestore
}