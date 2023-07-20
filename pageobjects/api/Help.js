var unirest = require('unirest')
require('dotenv').config();
const ApiCommands = {
    CancelDriverBids: function (token, id) {
        function CanceledActiveBids(index, tokenAdmin) {
            console.log(`я в отмене ${tokenAdmin}`)
            return unirest('GET', `${process.env.Url}api/bids/getlist?$filter=isDeleted eq false and driverId in (${id}) and status in ('Started','Planned')&$orderby=firstBidPointPlanEnterDate desc&$top=30&$skip=0`)
                .headers({
                    'Authorization': `Bearer ${tokenAdmin}`
                })
                .then(function (res) {
                    if (res.error) console.error(res.error);
                    var bidsBody = JSON.parse(res.raw_body); // список заявок
                    sendCanceledLoop(0, tokenAdmin, bidsBody)
                })
        }
        function sendCanceledLoop(index, token, list) {
            if (list[index]) {
                Canceled(index, token, list);
                setTimeout(() => {
                    sendCanceledLoop(index + 1, token, list);
                }, 100); // пауза секунда после создания
            }
        }
        function Canceled(index, token, listBid) {
            return unirest('POST', `${process.env.Url}api/bids/cancel`)
                .headers({
                    'Authorization': `Bearer ${token} `,
                    'Content-Type': ['application/json', 'application/json']
                })
                .send(JSON.stringify({ 'bidId': `${listBid[index].id}` }))
                .then(function (res) {
                    if (res.error) console.error(res.error);
                    console.log(`\nзаявка ${listBid[index].id} отменена\n`);
                }) //запрос на отмену заявки
                .catch(error => {
                    console.error(error);
                });
        }
        return CanceledActiveBids(0, token)
    },
    GetRandomCar(token) {
        return unirest('GET', `${process.env.url}api/Car/GetList?$top=30&$filter=isDeleted%20eq%20false&$orderby=lastFixedAt%20asc`) // получаю список машин у которых есть трекер
            .headers({
                'Authorization': `Bearer ${token}`
            })
            .then(function (res) {
                RandomCar = JSON.parse(res.raw_body); // список машин
                console.log(`при запросе получения машин ${res.status},фильтр`)
                if (RandomCar.length == 0) {
                    return this.api.assert.fail(`нет машин из фильтра`)
                }
                return RandomCar
            })
            .catch(error => {
                console.error(error)
                return this.api.assert.fail(error)
            })
    }
};
module.exports = ApiCommands

// module.exports = {
//     url: process.env.Url,
//     commands: [ApiCommands]
// }