import { db } from '../models/swatchModel.js';
import bcrypt from 'bcrypt';
import jwt_decode from 'jwt-decode';

const SALT_WORK_FACTOR = 10;

export const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, email, password, key } = req.body;

  bcrypt.hash(password, SALT_WORK_FACTOR)
    .then(hash => {
      const query = `
        INSERT INTO users
          (username, email, password, validateKey)
        VALUES
          ($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
        RETURNING id;
      `;
      const values = [
        username,
        email,
        hash,
        key
      ];

      return db.query(query, values);
    })
    .then(response => {
      if (!response.rows.length) {
        return next({
          log: 'Error occured in userController.createUser',
          status: 409,
          message: {
            err: 'Email already in use'
          }
        });
      }
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
  const { username, password } = req.body;
  const query = `
    SELECT *
    FROM users
    WHERE username = $1
  `;
  const values = [username];
  
  db.query(query, values)
    .then(response => {
      const user = response.rows[0];
      return bcrypt.compare(password, user.password);
    })
    .then(valid => {
      if (valid) {
        res.locals.user = username;
        return next();
      } else {
        return next({
          log: 'Error occured in userController.verifyUser',
          status: 403,
          message: {
            err: 'Invalid Credentials'
          }
        });
      }
    })
    .catch(err => {
      return next({
        log: 'Error in userController.verifyUser',
        message: {
          err: err
        }
      });
    });
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
    const queryStr = `UPSERT INTO users (id, username, email, password) VALUES (DEFAULT, $1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING id`;
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
