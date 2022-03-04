module.exports = {
    logout: async () => {
        let result = {
            message: null,
            status: null,
            data: null,
        }

        const { accessToken, refreshToken } = cookies;

        try {
            console.log("TESTING LOGOUT", cookies);

            res.clearCookie('refreshToken', refreshToken, {path: "/", domain: "book-libraryshop.herokuapp.com", httpOnly: true, sameSite: "None", secure: true});
            res.clearCookie('accessToken', accessToken, {path: "/", domain: "book-libraryshop.herokuapp.com", httpOnly: true, sameSite: "None", secure: true});
            
            result.status = 204;
            result.message = "Your logout is successful!";
            return result;
        } catch (err) {
            result.status = 400;
            result.message = "Your logout is unsuccessful!";
            return result;
        }
    }
}