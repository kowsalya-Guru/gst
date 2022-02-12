const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const cors = require('cors')
const app = express();

mongoose.connect(
  "mongodb://localhost:27017/sample",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(() => {
  console.log("Connected to database!");
})
.catch(err => {
  console.log("Connection failed!"); console.log(err);
});

mongoose.connection
.on('open', res => {
  console.log(process.env.MONGO_DB_NAME + ' connection has been made...');
})
.on('error', err => {
  console.log(err);
});

/* extended - false => where the value can be a string or array (
 * extended - true (default) => any type
*/ 
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 
app.use('/images', express.static(path.join("backend/images")));

//############################################################################################
// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_KEY);
//     req.userData = { email: decodedToken.email, userId: decodedToken.userId };
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "You are not authenticated!" });
//   }
// };

// exports.checkToken = async function(req, res, next) {
//   var user_id = await jwt.verify(req.session.token, config.secret_key);
//   axios.get(`${config.api_url}/account/auth?id=${user_id.sub}`)
//   .then((response) => {
//   req.usrObj = response.data;
//       return next();
//   })
//   .catch((error) => {  return res.status(401).send({message: 'Unauthorised user.'}); });
// }
//############################################################################################

app.use((req, res, next) => {
  console.log('inside app - use'); console.log(req.body);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
  // if(req.method == 'POST' && req.path == '/api/login') return next();
  
  // checkAuthToken();
  
});

// app.use("/api/posts", postsRoutes);
// app.use("/api/user", userRoutes);

module.exports = app;