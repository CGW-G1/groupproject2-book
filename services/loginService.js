require('dotenv').config();
const bcrypt = require("bcrypt");
const res = require('express/lib/response');
const jwt = require("jsonwebtoken");

const { Users } = require("../connect.js");

module.exports = {
    login: async (email, password) => {
        let result = {
            message: null,
            status: null,
            data: null,
        }

        const user = await Users.findOne({ where: { email: email } });

        if (!user) {
            result.message = "User not found. You have entered the wrong email, please try logging in again.";
            result.status = 400;
            return result;
        }

        const passwordVerification = await bcrypt.compare(password, user.password);

        if (!passwordVerification) {
            result.message = "You have entered the wrong password";
            result.status = 400;
            return result;
        }

        const loginData = {
            userId: user.userId,
            username: user.username
        }

        const accessToken = jwt.sign(loginData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
        const refreshToken = jwt.sign(loginData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y" });

        result.data = {
            accessToken: accessToken, 
            refreshToken: refreshToken, 
        };
        result.status = 200;
        result.message = "Your login is successful!";
        return result;
    }
}