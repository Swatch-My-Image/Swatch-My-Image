import * as db from '../models/swatchModel.js';
import bcrypt from 'bcrypt';
import jwt_decode from 'jwt-decode';

 const SALT_WORK_FACTOR = 10;

export const userController = {};

userController.createUser = (req, res, next) => {
  const { username, email, password, key } = req.body;

  bcrypt.hash(password, SALT_WORK_FACTOR)
    .then(hash => {
      const query = `
        INSERT INTO users
          (username, email, password, key)
        SELECT
          $1, $2, $3, $4
        WHERE NOT EXISTS (
          SELECT email
          FROM users
          WHERE email = $2
        )
      `;
      const values = [
        username,
        email,
        hash,
        key
      ];

      db.query(query, values);
    })
    .then(response => {
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error occured in userController.createUser',
        message: {
          err: err
        }
      });
    });
};

userController.verifyUser = (req, res, next) => {
  // need to be able to verify native auth user
  // need to be able to verify Oauth user

  // try to query database for user
  // if user doesnt exist
    // if it is a valid Oauth request
      // insert user into users table with DUMMY PASSWORD
      // USER HAS BEEN VERIFIED
    // if invalid Oauth Request
        // USER CANNOT BE VERIFIED
  // else if user exists
    // if user provided a password
      // hash the password and compare with user's password
      // if match, USER HAS BEEN VERIFIED
      // else, USER CANNOT BE VERIFIED
    // if user did not provide a password
      // *** this means user was found in database but password was not provided
      // *** would reach this route if using OAuth because oauth doesnt provide password
      // *** BUT WE NEED LOGIC IN LOGIN PAGE TO NOT ALLOW BLANK PASSWORD SUBMISSION
      // USER CAN BE VERIFIED
};

userController.jwt = (req, res, next) => {
  try {
    const userObject = jwt_decode(req.body.credential);
    res.locals.googleEmail = userObject.email;
    return next();
  } catch(error) {
    return next({
      log: 'Error occurred in userController.jwt middleware',
      status: 500,
      message: { error },
    });
  }
}

userController.verifyOauth = async (req, res, next) => {
  try {
    const queryStr = `UPSERT INTO users (id, username, email, password) VALUES (DEFAULT, $1, $2, $3) ON CONFLICT DO NOTHING`;
    const newGoogleUser = ['google user', email, 'google password'];
    const userId = await db.query(queryStr, newGoogleUser);
    return next();
  } catch(error) {
    return next({
      log: 'Error occurred in userController.verifyOauth middleware',
      status: 500,
      message: { error },
    });
  }
}
