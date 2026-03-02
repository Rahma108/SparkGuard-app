<<<<<<< HEAD
// npm i jsonwebtoken

import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../../../config/config.service.js';

// Token 
//  and return a JSON Web Token (JWT) that contains the userId and will expire
// after “1 hour”. (Get the email and the password from the body). (0.5 Grade) 


export const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        SECRET_KEY,
        { expiresIn: "1h" } //End Time ...
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
};



=======
// npm i jsonwebtoken

import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../../../config/config.service.js';

// Token 
//  and return a JSON Web Token (JWT) that contains the userId and will expire
// after “1 hour”. (Get the email and the password from the body). (0.5 Grade) 


export const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        SECRET_KEY,
        { expiresIn: "1h" } //End Time ...
    );
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
};



>>>>>>> d999e0648c20aa5e0c5ea4b62cd27880d6db0d49
