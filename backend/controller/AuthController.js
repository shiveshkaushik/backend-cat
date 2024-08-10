const auth = require('../model/AuthModel.js');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
/*
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};
*/
const generateToken = (user) => {
    const payload = {
        email: user.email,
        logtime: user.logtime,
    };
    const time = { expiresIn: '1d' };
    return jwt.sign(payload, secret, time);
};

const postLogin = async(req,res) => {
    try{
        console.log('Req body rece')
        const { username:username, password: password } = req.body;

        if (!username) {
            return res.status(400).send('Username is required');
        }

        if (!password) {
            return res.status(400).send('Password is required');
        }

        const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
        if (!passRegex.test(password)) {
            return res.status(400).send('Password is not valid');
        }

        const logUser = await auth.findOne({ username:username });
        if (!logUser) {
            return res.status(404).send('User not found');
        }

        //const isMatched = await comparePassword(password, logUser.password);
        if (password!=logUser.password) {
            return res.status(400).send('Invalid Credentials');
        }

        const loginTime = new Date().getTime();
        const token = generateToken({ username:username,logtime: loginTime});
        res.status(200).json({ token: token });
    }catch(err)
    {
        console.log(err);
        res.status(500).send('Error');
    }
}



module.exports = {postLogin};