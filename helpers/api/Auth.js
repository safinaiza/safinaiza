
var unirest = require('unirest')
const Auth = {
GenerateTokenAdmin: function() {
    return unirest("POST", 'https://test.cargorun.ru/Account/GenerateToken') //ссылка 
        .headers({
            "Content-Type": "application/json",
            'X-ClientId': 'dev-tests'
        })
        .send(JSON.stringify({ userName: 'manager-role@mail.ru', password: 'sagav887' })) //данные для входа 
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
module.exports = Auth