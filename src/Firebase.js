import {
  initializeApp
} from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3cieZtbsasWDF-yy_w5uSeJz28voRqWg",
  authDomain: "hgo-weather-app.firebaseapp.com",
  projectId: "hgo-weather-app",
  storageBucket: "hgo-weather-app.appspot.com",
  messagingSenderId: "27190543047",
  appId: "1:27190543047:web:7c9618d3a01cb50525b4e2",
  measurementId: "G-P3TREL777T"
};

// async function getFirebasedb(code) {
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   const firebaseConfig = {
//     apiKey: "AIzaSyA3cieZtbsasWDF-yy_w5uSeJz28voRqWg",
//     authDomain: "hgo-weather-app.firebaseapp.com",
//     projectId: "hgo-weather-app",
//     storageBucket: "hgo-weather-app.appspot.com",
//     messagingSenderId: "27190543047",
//     appId: "1:27190543047:web:7c9618d3a01cb50525b4e2",
//     measurementId: "G-P3TREL777T"
//   };

//   try {
//     initializeApp(firebaseConfig);

//     const db = getFirestore();

//     return db;

//     // const collRef = doc(db, "cities",code);
  
//     // const data = await getDoc(collRef);

//     // if(data){
//     //   return data.data().cities;
//     // }else{
//     //   return [];
//     // }
//   } catch (error) {
//     return null;
//   }


// }



export default firebaseConfig;