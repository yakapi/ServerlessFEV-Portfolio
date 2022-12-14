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
  let projects_doc = []
  await projects.get().then((querySnapshot) =>{
    querySnapshot.forEach((document) => {
      let projet_doc = {
        id: document.data().id,
        title: document.data().title,
        describe: document.data().describe,
        link_project: document.data().link_project,
        img_url: document.data().img_url
      }
      projects_doc.push(projet_doc)
      // console.log(document.data());
    });
  })
  return projects_doc
}
async function getAllMedias(){
  const medias = db.collectionGroup("media")
  let medias_doc = []
  await medias.get().then((querySnapshot) =>{
    querySnapshot.forEach((document) => {
      let media_doc = {
        id: document.data().id,
        name: document.data().name,
        url_link: document.data().url_link,
        img_url: document.data().img_url,
      }
      medias_doc.push(media_doc)
      // console.log(document.data());
    });
  })
  return medias_doc
}

async function getAllSkills(){
  const skills = db.collectionGroup("skills")
  let skills_doc = []
  await skills.get().then((querySnapshot) =>{
    querySnapshot.forEach((document) => {
      let skill_doc = {
        id: document.data().id,
        name: document.data().name,
        img_url: document.data().img_url,
      }
      skills_doc.push(skill_doc)
      // console.log(document.data());
    });
  })
  return skills_doc

}

//Add Express

// Initialize Express
const app = express();

app.use(cors({
  origin: "http://victor.barlier.free.fr",
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
  let projects = await getAllProjects(db)
  res.json(projects);
});
app.get("/medias", async(req, res, next) => {
  let medias = await getAllMedias(db)
  res.json(medias);
});
app.get("/skills", async(req, res, next) => {
  let skills = await getAllSkills(db)
  res.json(skills);
});
// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});
