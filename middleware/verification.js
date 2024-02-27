const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const { ENCRYPTION_KEY } = process.env;

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(401).json({
            message: 'Token not provided'
        });
    }

    const token = bearerHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, ENCRYPTION_KEY);
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token is not valid'
        });
    }
}

module.exports = {
    verifyToken
}