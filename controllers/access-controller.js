const registerService = require("../services/register-service.js");
const loginService = require("../services/login-service.js");
const Constants = require("../constants/index");

class accessController {
    async register(req, res) {
        // check if password used is longer than 72 bytes long
        // bcrypt 5.0.1 limitations, only 1st 72 bytes of string are used in hashing
        let checkLength = new TextEncoder().encode(req.body.password).length;
        console.log("Checking byte length: ", checkLength);

        if (!req.body.password || checkLength > 72 || req.body.password.length < 5) {
            return res.status(400).json({ message: "Password should contain at least 5 chars." });
        }

        const result = await registerService.register(req.body.email.toString(), req.body.username.toString(), req.body.password.toString());
        return res.status(result.status).json({ message: result.message });
    }

    async login(req, res) {
        if (!req.body.email) {
            return res.status(400).json({ message: "Your email is invalid." });
        }

        if (!req.body.password) {
            return res.status(400).json({ message: "Your password is invalid." });
        }

        const result = await loginService.login(req.body.email.toString(), req.body.password.toString());

        if (result.status == 200) {
            res.cookie(Constants.REFRESH_TOKEN, result.data.refreshToken, { httpOnly: true, sameSite: "None", secure: true });
            res.cookie(Constants.ACCESS_TOKEN, result.data.accessToken, { httpOnly: true, sameSite: "None", secure: true });
            return res.status(result.status).json({ message: result.message });
        } else if (result.status == 400) {
            return res.status(result.status).json({ message: result.message });
        }
    }
}

module.exports = accessController;