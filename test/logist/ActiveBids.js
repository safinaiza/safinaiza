var moment = require('moment')
var unirest = require('unirest')
const { GenerateTokenAdmin } = require('../../pageobjects/api/Auth');
const { CancelDriverBids } = require('../../pageobjects/api/Help');
const { CreateBid } = require('../../pageobjects/api/CreateBids');
const { StartBid } = require('../../pageobjects/api/StartBid');

module.exports = {
    tags: ['Bids'],
    'Авторизация водителя': async function (browser) {
        await GenerateTokenAdmin()
        await CancelDriverBids(adminToken, 255)
        await CreateBid(255, adminToken)
        await StartBid(createBidId, adminToken)
    },
    // 'Проверка созданной заявки': function (app) {
    //     CreateBid(adminToken)
    //     app
    //         .pause(5000)
    //         .waitForElementPresent('xpath', `//android.view.View[@content-desc="№${createBidId}"]`)
    //         .waitForElementPresent('xpath', '//android.view.View[@content-desc="Начата"]')
    //         .waitForElementPresent('xpath', '//android.view.View[@content-desc="Текущая: (A) Нижнекамск"]')
    //         .waitForElementPresent('xpath', '//android.view.View[@content-desc="К817ЕК/716"]')
    // }
}
// function GenerateTokenAdmin() {
//     return unirest("POST", `${process.env.Url}Account/GenerateToken`)
//         .headers({
//             "Content-Type": "application/json",
//             'X-ClientId': 'dev-tests'
//         })
//         .send(JSON.stringify({ userName: process.env.adminLogin, password: process.env.adminPass }))
//         .then((res) => {
//             adminBody = JSON.parse(res.raw_body);
//             adminToken = adminBody.accessToken.token;
//             return adminToken
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }

// function CreateBid(token) {
//     return unirest('POST', `${process.env.Url}api/truckingbids/apply`)
//         .headers({
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         })
//         .send(JSON.stringify({
//             "pointsNotComparedToSegments": false,
//             "bidPointDatesChanged": false,
//             "isExpressBid": false,
//             "updateRefuelings": false,
//             "responsibleId": 36,
//             "paymentTypeId": process.env.paymentTypeId,
//             "ndsTypeId": process.env.ndsTypeId,
//             "price": "1312",
//             "cargos": [
//                 {
//                     "extendedProperties": []
//                 }
//             ],
//             "typeOptions": [],
//             "bidPoints": [
//                 {
//                     "order": 0,
//                     "type": "LoadPoint",
//                     "planEnterDate": `${moment().format("YYYY-MM-DD HH:mm")}`,
//                     "geozone": {
//                         "location": {
//                             "type": "Point",
//                             "coordinates": [
//                                 51.81289672851563,
//                                 55.63807369279808
//                             ]
//                         },
//                         "address": "Россия, Республика Татарстан, Нижнекамск, 30-й микрорайон",
//                         "city": "Нижнекамск",
//                         "state": "Республика Татарстан",
//                         "county": "Нижнекамский район",
//                         "street": null,
//                         "houseNumber": null,
//                         "federalDistrict": "Приволжский федеральный округ",
//                         "radius": 0
//                     },
//                     "cargoOwnerDictionaryItemId": null,
//                     "contactPerson": {},
//                     "extendedProperties": [],
//                     "counterpartyPointId": null,
//                     "scenarioId": 0
//                 },
//                 {
//                     "order": 1,
//                     "type": "UnloadPoint",
//                     "planEnterDate": `${moment().add(1, 'd').format("YYYY-MM-DD HH:mm")}`,
//                     "geozone": {
//                         "location": {
//                             "type": "Point",
//                             "coordinates": [
//                                 52.40478515625001,
//                                 55.71782880151228
//                             ]
//                         },
//                         "address": "Россия, Республика Татарстан, Набережные Челны, 60-й комплекс",
//                         "city": "Набережные Челны",
//                         "state": "Республика Татарстан",
//                         "county": "городской округ Набережные Челны",
//                         "street": null,
//                         "houseNumber": null,
//                         "federalDistrict": "Приволжский федеральный округ",
//                         "radius": 0
//                     },
//                     "cargoOwnerDictionaryItemId": null,
//                     "contactPerson": {},
//                     "extendedProperties": [],
//                     "counterpartyPointId": null,
//                     "scenarioId": 0
//                 }
//             ],
//             "documents": [],
//             "extendedProperties": [
//                 {
//                     "propertyName": "аывфвафав",
//                     "value": "12312"
//                 }
//             ],
//             "driver": {
//                 "id": process.env.driverId
//             },
//             "carOption": {
//                 "carId": RandomCar[0].id
//             },
//             "bookFieldsLoading": false,
//             "carStatus": {
//                 "lastBidId": null,
//                 "releaseDate": null,
//                 "status": "Idle"
//             }
//         }))
//         .then(function (res) {
//             var responceBody = JSON.parse(res.raw_body)
//             createBidId = responceBody.id
//             return unirest('POST', `${process.env.Url}api/truckingbids/setStatus`)
//                 .headers({
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 })
//                 .send(JSON.stringify({
//                     "bidId": createBidId,
//                     "status": "Started"
//                 }))
//                 .then(function (res) {
//                     return console.log(res.raw_body);
//                 })
//                 .catch(error => {
//                     browser.assert.fail(error);
//                 })
//         })
//         .catch(error => {
//             browser.assert.fail(error);
//         })
// }

