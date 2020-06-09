import firebase from 'firebase'; 


var firebaseConfig = {
    apiKey: "AIzaSyCKstzzHk2HNoSt9jyScjiqVIFQaAToI5k",
    authDomain: "app3-1cc50.firebaseapp.com",
    databaseURL: "https://app3-1cc50.firebaseio.com",
    projectId: "app3-1cc50",
    storageBucket: "app3-1cc50.appspot.com",
    messagingSenderId: "332712525922",
    appId: "1:332712525922:web:598122553e703ed094113b"
};

firebase.initializeApp(firebaseConfig);


const firestore = {
    auth: firebase.auth(),
    db: firebase.firestore(),
    storage: firebase.storage()
}


export default firestore;