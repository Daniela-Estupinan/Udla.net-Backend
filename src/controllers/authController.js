const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken.js");

const signup = async (req, res) => {
  try {
    const data = req.body;
    const { firstName, email,password,lastName,role,isActive,age,gender,semester,major,description,profilePicture,interest,links,communitys } = data;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createduser = new User({
      firstName: firstName,
      password: hashedPassword,
      email: email,
      role:role,
      isActive:isActive,
      lastName:lastName,
      age:age,
      gender:gender,
      semester:semester,
      major:major,
      description:description,
      profilePicture:profilePicture,
      interest:interest,
      links:links,
      communitys:communitys,

    });
    
    const dominio = createduser.email.split("@");

    if(dominio[1]=="udla.edu.ec"){
      console.log("El dominio es: "+dominio[1]);
      const saveuser = await createduser.save();
        res.status(200).send({
          status: "success",
          message: "user saved successfully",
          data: {
            user: firstName,
          },
        });
    
        
    }else{
      res.status(500).send({
        message:"El dominio no es correcto, no es una cuenta de la udla",
     });
    }

   } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }

};
const login = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({ email:email });
    
      if (!user) {
        return res.status(401).send({
          status: "failure",
          message: "user does not exist",
        });
      }
    if(user.isActive==true){
    }else{
        return res.status(401).send({
        status: "failure",
        message: "user is not active",
      })
    }
    
    const accessToken = generateToken.generateAccessToken(user);
    const refreshToken = generateToken.generateRefreshToken(user);
    await User.findByIdAndUpdate(user._id, {
      jwtToken: refreshToken,
    });
    const { jwtToken, password: newpass, ...other } = user._doc;
    res.status(200).send({
      status: "success",
      message: "logged in successfully",
      data: other,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await User.updateOne({ jwtToken: refreshToken }, [
        { $unset: ["jwtToken"] },
      ]);
      res.status(200).send({
        status: "success",
        message: "You've been logged out",
      });
    } else {
      return res.status(400).send({
        status: "failure",
        message: "logout error",
      });
    }
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};
const verify = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(403).json("You are not authorized");
  }
  const token = authHeader.split(" ")[1];
  try {
    if (authHeader) {
      jwt.verify(token, "YOUR_SECRET_KEY", (err, user) => {
        if (err) {
          throw new Error("token is not valid!");
        }
        req.user = user;
        next();
      });
    }
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};
const refresh = async (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    res.status(401).send({
      status: "failure",
      message: "You are not authenticated!",
    });
  }
  try {
    const token = await User.findOne(
      { jwtToken: refreshToken },
      { jwtToken: true }
    );
    if (!token) {
      res.status(200).send({
        status: "failure",
        message: "Refresh token is not valid!",
      });
    }
    jwt.verify(
      refreshToken,
      "YOUR_SECRETKEY_REFRESHTOKEN",
      async (err, user) => {
        if (err) {
          throw new Error("token is not valid!");
        }
        const newAccessToken = generateToken.generateAccessToken(user);
        const newRefreshToken = generateToken.generateRefreshToken(user);
        await User.updateOne(
          { jwtToken: refreshToken },
          { $set: { jwtToken: newRefreshToken } }
        );
        res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      }
    );
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  verify,
  refresh,
};