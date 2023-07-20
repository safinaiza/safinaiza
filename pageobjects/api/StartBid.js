var unirest = require('unirest')
require('dotenv').config();

const StartBid = {
    StartBid: function (bidId, token) {
        unirest('POST', `${process.env.Url}api/truckingbids/setStatus`) //запуск заявки
            .headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            })
            .send(JSON.stringify({
                "bidId": bidId,
                "status": "Started"
            }))
            .then(function (res) {
                return console.log(res.raw_body);
            })
            .catch(error => {
                // browser.assert.fail(error);
            })
    }
}
module.exports = StartBid
