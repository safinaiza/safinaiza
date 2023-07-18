const { GenerateTokenAdmin } = require('../../helpers/api/Auth');
var unirest = require('unirest');
var moment = require('moment')


function CreateBid(driverid, token) {
    console.log('test')
    return unirest('POST', `https://test.cargorun.ru/api/truckingbids/apply`)
        .headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
        .send(JSON.stringify({
            "pointsNotComparedToSegments": false,
            "bidPointDatesChanged": false,
            "isExpressBid": false,
            "updateRefuelings": false,
            "responsibleId": 36,
            "paymentTypeId": 176,
            "ndsTypeId": 175,
            "price": "1312",
            "cargos": [
                {
                    "extendedProperties": []
                }
            ],
            "typeOptions": [],
            "bidPoints": [
                {
                    "order": 0,
                    "type": "LoadPoint",
                    "planEnterDate": `${moment().format("YYYY-MM-DD HH:mm")}`,
                    "geozone": {
                        "location": {
                            "type": "Point",
                            "coordinates": [
                                51.81289672851563,
                                55.63807369279808
                            ]
                        },
                        "address": "Россия, Республика Татарстан, Нижнекамск, 30-й микрорайон",
                        "city": "Нижнекамск",
                        "state": "Республика Татарстан",
                        "county": "Нижнекамский район",
                        "street": null,
                        "houseNumber": null,
                        "federalDistrict": "Приволжский федеральный округ",
                        "radius": 0
                    },
                    "cargoOwnerDictionaryItemId": null,
                    "contactPerson": {},
                    "extendedProperties": [],
                    "counterpartyPointId": null,
                    "scenarioId": 0
                },
                {
                    "order": 1,
                    "type": "UnloadPoint",
                    "planEnterDate": `${moment().add(1, 'd').format("YYYY-MM-DD HH:mm")}`,
                    "geozone": {
                        "location": {
                            "type": "Point",
                            "coordinates": [
                                52.40478515625001,
                                55.71782880151228
                            ]
                        },
                        "address": "Россия, Республика Татарстан, Набережные Челны, 60-й комплекс",
                        "city": "Набережные Челны",
                        "state": "Республика Татарстан",
                        "county": "городской округ Набережные Челны",
                        "street": null,
                        "houseNumber": null,
                        "federalDistrict": "Приволжский федеральный округ",
                        "radius": 0
                    },
                    "cargoOwnerDictionaryItemId": null,
                    "contactPerson": {},
                    "extendedProperties": [],
                    "counterpartyPointId": null,
                    "scenarioId": 0
                }
            ],
            "documents": [],
            "extendedProperties": [
                {
                    "propertyName": "аывфвафав",
                    "value": "12312"
                }
            ],
            "driver": {

                "id": driverid
            },
            "carOption": {
                "carId": '1000352'
            },
            "bookFieldsLoading": false,
            "carStatus": {
                "lastBidId": null,
                "releaseDate": null,
                "status": "Idle"

            }

        }))
        .then(function (res) {
            console.log(res.raw_body)
            var responceBody = JSON.parse(res.raw_body)
            createBidId = responceBody.id
            console.log(res.status)

            // return unirest('POST', `https://test.cargorun.ru/api/truckingbids/setStatus`) //запуск заявки
            //     .headers({
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'application/json'
            //     })
            //     .send(JSON.stringify({
            //         "bidId": createBidId,
            //         "status": "Started"
            //     }))
            //     .then(function (res) {
            //         return console.log(res.raw_body);
            //     })
            //     .catch(error => {
            //         // browser.assert.fail(error);
            //     })
        })
        .catch(error => {
            console.log(error)
        })

}
GenerateTokenAdmin().then(() => {
    CreateBid(255, adminToken).then(() => {
      StartBid(createBidId, adminToken)
    })
})

function StartBid(bidId, token){
    unirest('POST', `https://test.cargorun.ru/api/truckingbids/setStatus`) //запуск заявки
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