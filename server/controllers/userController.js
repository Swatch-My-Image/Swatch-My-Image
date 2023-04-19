import { db } from '../models/swatchModel.js';
import bcrypt from 'bcrypt';

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
        RETURNING *;
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
        throw new Error('Username already taken');
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
        throw new Error('Invalid Credentials');
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
