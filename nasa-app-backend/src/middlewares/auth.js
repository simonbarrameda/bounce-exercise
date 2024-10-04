import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';

const verifyCallback = (resolve, reject) => (err, user, info) => {
  if (err || info) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  resolve();
};

const auth = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(resolve, reject))(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

export default auth;
