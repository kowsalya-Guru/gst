const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const { reset } = require('nodemon');

var userModel = require('../models/user');
var loginModel = require('../models/login');


exports.userLogin = (req, res, next) => {
    let fetchedUser;
    userModel.findOne({ email: req.body.email })
    .then(usr => {
        if (!usr) {
          return res.status(401).json({
            
            message: "Auth failed"
            
          });
        }
        fetchedUser = usr;
         salt=10;
        
        bcrypt.hash(usr.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          usr.password = hash;
          next();
      });
        return bcrypt.compare(req.body.password, hash);
    })
    .then(result => {
      console.log(result);
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
     
      const token = jwt.sign({userId: fetchedUser._id }, process.env.JWT_KEY, { expiresIn: "1h" });
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
       req.body.active = true;
    loginModel.create(req.body, (err, r_login) => {
      if(err) {
        console.log("hrer");
          console.log(err);
          res.status(503).send(err);
      } else {
          res.send(r_login);
      }
  });
      console.log('user',usr.name)
    })
    .catch(err => {
        console.log(err);
        console.log("error")
        return res.send(err);
    });
   
  }
 
  exports.userLogout = (req, res, next) => {
    let fetchedUser;
    userModel.findOne({ email: req.body.email })
    .then(usr => {
      if(!usr){
        console.log("logout failure");
      }
      else{
        jwtr.destroy(token)
        console.log("logout success");
      }
        fetchedUser = usr;
        
        return bcrypt.compare(req.body.password, usr.password);
    })
    .catch(err => {
      console.log(err);
      return res.send(err);
  });
  }
  exports.userCreate = (req, res, next) => {
    req.body.active = true;
    userModel.create(req.body, (err, r_user) => {
        if(err) {
            console.log(err);
            res.status(503).send(err);
        } else {
            res.send(r_user);
        }
    });
}

exports.readLogin = (req, res, next) => {
  let _query = {};
  
  if(Object.keys(req.query).length) {
      _query = req.query;
      if(_query.active) _query.active = _query.active === 'true' ? true : false;
  }   loginModel.find(_query, (err, r_user) => {
   
      if(err) {
          console.log(err);
          res.status(503).send(err);
      } else {
          res.send(r_user);
          // console.log(r_user);
          reset()
      }
  });
}
exports.readRegister = (req, res, next) => {
  console.log("inside");
  let _query = {};
  
  if(Object.keys(req.query).length) {
      _query = req.query;
      console.log("req query",req.query);
      if(_query.active) _query.active = _query.active === 'true' ? true : false;
      
        if(req.body.email) _query.email = {$in: req.body.email.map((item) => new RegExp(item, 'i'))};
      
      
  }
  console.log("query",_query);   
  userModel.find(_query, (err, r_user) => {
   
      if(err) {
          console.log(err);
          res.status(503).send(err);
      } else {
          res.send(r_user);
          // console.log(r_user);
          reset()
      }
  }); 
}

