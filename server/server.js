import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { swatchRouter } from './routes/swatchRouter.js';
import { userRouter } from './routes/userRouter.js';

dotenv.config();

const app = express();

const PORT = 3000;

/**
 * handle parsing request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * session middleware
 */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

/**
 * define route handlers
 */
app.use('/users', userRouter);
app.use("/swatch", swatchRouter);

app.use((req, res, next) => {
  return next({
    log: "No handler for provided route",
    status: 404,
    message: { err: "Page not found" },
  });
});

app.use((err, req, res, next) => {
  const defaultError = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign(defaultError, err);
  console.log("ERROR: ", err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}...`);
});
