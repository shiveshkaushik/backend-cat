const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const getDashboard = async (req, res) => {
    try {
        const authHeader = req.headers && req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).send('No token provided');
        }
        res.status(200).send("Welcome to Dashboard");

    } catch (err) {
        res.status(500).send('Server Error');
    }
};

module.exports = {getDashboard}
