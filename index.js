// var serviceAccount = require("./portfolio-29765-firebase-adminsdk-tvk6j-96416ba553.json");
var serviceAccount = {
  "type": process.env.firebase_type,
  "project_id": process.env.firebase_project_id,
  "private_key_id": process.env.firebase_private_key_id,
  "private_key": process.env.firebase_private_key,
  "client_email": process.env.firebase_client_email,
  "client_id": process.env.firebase_client_id,
  "auth_uri": process.env.firebase_auth_uri,
  "token_uri": process.env.firebase_token_uri,
  "auth_provider_x509_cert_url": process.env.firebase_auth_provider_x509_cert_url,
  "client_x509_cert_url": process.env.firebase_client_x509_cert_url
}

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

async function getAllProjects(){
  const projects = db.collectionGroup("projets")
  projects.get().then((querySnapshot) =>{
    let projects_doc = []
    querySnapshot.forEach((document) => {
      let projet_doc = {
        id: document.data().id,
        title: document.data().title,
        describe: document.data().describe,
        link_project: document.data().link_project,
        img_url: document.data().img_url
      }
      projects_doc.push(projet_doc)
      console.log(document.data());
    });
    return console.log("hello");
  })
}

//Add Express

// Initialize Express
const app = express();

app.use(cors({
  origin: "http://www.victor.barlier.free.fr",
  credentials: true
}))

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
app.get("/user", async(req, res, next) => {
  let user =   await getUser(db)
  res.json(user);
});
app.get("/users", (req, res) => {
//   res.send(getAllUsers(db)
// );
});
app.get("/projets", async(req, res, next) => {
  let projects =   await getAllProjects(db)
  let test = console.log(projects);
  res.json(test);
});
// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});
