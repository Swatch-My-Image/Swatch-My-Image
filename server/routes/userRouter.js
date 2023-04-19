import express from 'express';
import userController from '../controllers/userController';
import sessionController from '../controllers/sessionController';

export const userRouter = express.Router();


//signup request
userRouter.post('/signup',
  userController.createUser,
  (req, res) => {
    res.sendStatus(200);
  }
);

//login request
userRouter.post('/login',
  userController.verifyUser,
  userController.initializeSession,
  (req, res) => res.sendStatus(200)
);

userRouter.get('/sessions',
  sessionController.validateSession,
  (req, res) => {
    const { validSession } = res.locals;
    if (validSession) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  }
);

userRouter.delete('/logout',
  sessionController.terminateSession,
  (req, res) => res.sendStatus(200)
)