var serviceAccount = require("./portfolio-29765-firebase-adminsdk-tvk6j-96416ba553.json");

var admin = require("firebase-admin");
const express = require("express");
var cors = require('cors')

const app_fire = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// appel du table entière
async function getAllUsers(db){
  const users = db.collection("users")
  users.get().then((querySnapshot) =>{
    querySnapshot.forEach((document) => {
      // document.data();
      console.log(document.data());
    });

  })
}
//appel un seul element d'une table
async function getUser(){

  const user_alone = db.collection("users").doc("Wvnd9oO5aUFw1lfzggg4")
  const user_element = await user_alone.get()
  if (!user_element.exists) {
    console.log('No such document!');
  } else {
      let user_doc = {
        name: user_element.data().name,
        admin: user_element.data().admin,
        u_id: user_element.data().u_id
      }
      return user_doc
  }
}


//Add Express

// Initialize Express
const app = express();

const allowlist = ['http://victor.barlier.free.fr', 'http://victor.barlier.free.fr/'];

    const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = whitelist.indexOf(req.header('Origin')) !== -1;
    let isExtensionAllowed = req.path.endsWith('.jpg');

    if (isDomainAllowed && isExtensionAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true }
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://www.victor.barlier.free.fr");
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
app.get("/user", async(req, res, next) => {
  let test =   await getUser(db)
  res.json(test);
});
app.get("/users", (req, res) => {
  res.send(getAllUsers(db)
);
});
// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});
