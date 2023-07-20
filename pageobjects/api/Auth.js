var unirest = require('unirest')
require('dotenv').config();
const Auth = {
    GenerateTokenAdmin: function () {
        return unirest("POST", `${process.env.Url}Account/GenerateToken`)
            .headers({
                "Content-Type": "application/json",
                'X-ClientId': 'dev-tests'
            })
            .send(JSON.stringify({ userName: process.env.adminLogin, password: process.env.adminPass }))
            .then((res) => {
                adminBody = JSON.parse(res.raw_body);
                adminToken = adminBody.accessToken.token;
                console.log(adminToken)
            })
            .catch((error) => {
                console.log(error);
            })
    }
};
// Auth.GenerateTokenAdmin()
module.exports = Auth