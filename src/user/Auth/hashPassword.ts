import { hash } from './interface';
const bcrypt = require('bcrypt');
const saltRounds = 10;

export const hashPassword = (myPlaintextPassword: hash) => {
  bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    // Store hash in your password DB.
  });
};
