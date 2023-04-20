export const sessionController = {};

sessionController.initializeSession = (req, res, next) => {
  const { user } = res.locals;
  if (!req.session.user) {
    req.session.user = user;
    return next();
  } else {
    return next({
      log: 'Error occures in sessionController.initializeSession',
      message: {
        err: 'Unable to initialize a session because session already exists',
      },
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
  // remove sessionID cookie on client side
  // destroy session
  console.log('destroying session');
  req.session.destroy((error) => {
    if (error) {
      return next(
        createErrorObject(error, 'sessionController.terminateSession')
      );
    } else {
      res.clearCookie('connect.sid');
      return next();
    }
  });
};
