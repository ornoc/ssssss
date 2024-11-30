// src/util/token.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'your-secret-key';

exports.gerarToken = (user) => {
    return jwt.sign({ id: user._id, nick: user.nick }, secret, { expiresIn: '1h' });
};

exports.checkToken = (token, iduser, nick) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded.id === iduser && decoded.nick === nick;
    } catch (error) {
        return false;
    }
};
