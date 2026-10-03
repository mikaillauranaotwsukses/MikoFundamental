const jwt = require('jsonwebtoken');
require('dotenv').config();

const getJWTSecret = () => {
    return process.env.JWT_SECRET || 'H2uHwIJEtBV7htwinUxKpTzJrxW8bcd1fgQKpoi8gWU=';
};

const generateToken = (userId, role) => {
    return jwt.sign(
        {
            user_id: userId,
            role: role
        },
        getJWTSecret(),
        {
            expiresIn: '24h'
        }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, getJWTSecret());
};

module.exports = {
    generateToken,
    verifyToken
};
