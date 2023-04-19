import { db } from "../models/swatchModel.js";

export const swatchController = {};

swatchController.test = (req, res, next) => {
  console.log('running swatchController.testNow!');
  const queryStr = `SELECT * FROM users`;
  db.query(queryStr, (err, result) => {
    // error handler
    // if there's error, return next({error obj})
    if (err) {
      return next({
        log: "swatchController.test caught unknown error",
        status: 500,
        message: { err },
      });
    }
    console.log(result.rows);
    return next();
  });
};
