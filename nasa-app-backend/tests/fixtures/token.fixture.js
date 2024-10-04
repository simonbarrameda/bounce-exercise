import jwt from 'jsonwebtoken';
import config from '../../src/config/config.js';
import { tokenTypes } from '../../src/config/tokens.js';

const payload = { type: tokenTypes.ACCESS };
const token = jwt.sign(payload, config.jwt.secret);

export default token;
