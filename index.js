// Import the functions you need from the SDKs you need
// const firebase = require("firebase/admin")
var test = require("firebase/admin")
console.log(test);
var serviceAccount = require("./portfolio-29765-firebase-adminsdk-tvk6j-96416ba553.json");
var admin = require("firebase/app");
var firestore = require("firebase/firestore")
const firebaseConfig = {
  apiKey: "AIzaSyDpwWZdFJNMj-lNKVKcvXdIiQE__2IZI2c",
  authDomain: "portfolio-29765.firebaseapp.com",
  projectId: "portfolio-29765",
  storageBucket: "portfolio-29765.appspot.com",
  messagingSenderId: "509117271453",
  appId: "1:509117271453:web:673ee064be773c26cd3374",
  measurementId: "G-RKCTZ0P7NZ"
};
// const app_fire = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
const app_fire = admin.initializeApp(firebaseConfig);
let db = firestore.getFirestore(app_fire)

// console.log(firestore.collection(db, "users"));
  let user = firestore.collection(db, "users")
  // let user_doc = firestore.getDocs(user)
  console.log(user);
//  async function getCities(db) {
//   const citiesCol = firestore.collection(db, 'users');
//   const citySnapshot = await firestore.getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }
// let test = getCities(db)
// console.log(test);
//
// const db = admin.firestore()

// let user = db.collections("users")
// console.log(user);
// console.log(test)
// Initialize Firebase
// const db_firebase = firebase.firestore()
// const analytics = getAnalytics(app_fire);
// Add Express
// const express = require("express");
//
// // Initialize Express
// const app = express();
//
// // Create GET request
// app.get("/", (req, res) => {
//   res.send("Express on Vercel");
// });
//
// // Initialize server
// app.listen(5000, () => {
//   console.log("Running on port 5000.");
// });
