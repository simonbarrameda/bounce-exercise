import { jest } from '@jest/globals';
import passport from 'passport';
import httpStatus from 'http-status';
import auth from '../../../src/middlewares/auth.js';
import ApiError from '../../../src/utils/ApiError.js';

jest.mock('passport');

describe('Auth middlware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn();
    passport.authenticate = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('should call next() when authorization is successful', async () => {
    // Mock successful passport.authenticate
    passport.authenticate.mockImplementation((strategy, options, callback) => {
      return (req, res, next) => callback(null)(req, res, next);
    });

    await auth(req, res, next);

    // Ensure next() was called without arguments
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next(err) with an ApiError when authentication fails', async () => {
    const errorMessage = 'Please authenticate';

    // Mock failed passport.authenticate
    passport.authenticate.mockImplementation((strategy, options, callback) => {
      return (req, res, next) => callback(new Error('Unauthorized'))(req, res, next); // Simulate failure
    });

    await auth(req, res, next);

    // Ensure next() was called with an ApiError
    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(ApiError);
    expect(err.statusCode).toBe(httpStatus.UNAUTHORIZED);
    expect(err.message).toBe(errorMessage);
  });
});
