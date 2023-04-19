export const sessionController = {};

sessionController.initializeSession =(req, res, next) => {

  if (!req.session) {
    req.session.user = 'something'; // SET THIS TO SOMETHING ONCE WE ESTABLISH RES.LOCALS FROM PREV MIDDLEWARE
    return next();
  } else {
    return next({
      log: 'Error occures in sessionController.initializeSession',
      message: {
        err: 'Unable to initialize a session because session already exists'
      }
    });
  }
};

sessionController.validateSession = (req, res, next) => {
  if (!req.session || !req.session.user) {
    res.locals.validSession = false;
  } else {
    res.locals.validSession = true;
  }
};

sessionController.terminateSession = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log('Error: ', err)
    next();
  })
};