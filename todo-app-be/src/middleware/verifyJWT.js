import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.sendStatus(401); // unauthorized

  const token = authHeader.split(' ')[1]; // Bearer token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // invalid token (forbidden)
    req.user = decoded.username;
    next();
  });
};

export default verifyJWT;
