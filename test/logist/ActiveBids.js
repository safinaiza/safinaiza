var moment = require('moment')
var unirest = require('unirest')
const { GenerateTokenAdmin } = require('../../pageobjects/api/Auth');
const { CancelDriverBids } = require('../../pageobjects/api/Help');
const { CreateBid } = require('../../pageobjects/api/CreateBids');
const { StartBid } = require('../../pageobjects/api/StartBid');
let loadDate = moment().format('YYYY-MM-DD HH:mm') //въезд - текущий день, время
let unloadDate = moment().add(1, 'h').format('YYYY-MM-DD HH:mm') // выезд  - текущий день, время + 1 час
// const loadDateSecondBid = moment().add(1, 'd').format('DD.MM.YYYY HH:mm') //въезд - текущий день, время + 1 день
// const unloadDateSecondBid = moment().add(1, 'd').add(1, 'h').format('DD.MM.YYYY HH:mm') //выезд  - текущий день, время + 1 день, + 1 час

module.exports = {
    // tags: ['Bids'],
    'Создание заявки': async function () {
        await GenerateTokenAdmin()
        await CancelDriverBids(adminToken, 255)
        await CreateBid(255, adminToken, loadDate, unloadDate)
        await StartBid(createBidId, adminToken)
    },
    'Авторизация водителя': async function (app) {
        await app
            .Code()
            .sendLoginAndPass(app)
            .Push(app)
    },
    'Проверка созданной заявки': async function (app) {
        loadDate = moment(loadDate, 'YYYY-MM-DD HH:mm').format("DD.MM.YYYY HH:mm")
        unloadDate = moment(unloadDate, 'YYYY-MM-DD HH:mm').format("DD.MM.YYYY HH:mm")
        console.log(loadDate)
        console.log(unloadDate)
        await app
            .pause(5000)
            .waitForElementPresent('xpath', `//android.view.View[@content-desc="№${createBidId}"]`)
            .waitForElementPresent('xpath', '//android.view.View[@content-desc="Начата"]')
            .waitForElementPresent('xpath', '//android.view.View[@content-desc="Текущая: (A) Нижнекамск"]')
            .waitForElementPresent('xpath', '//android.view.View[@content-desc="К352ЕК/716"]')
            .waitForElementPresent('xpath', '//android.view.View[@content-desc="53.49 км"]')
            .waitForElementPresent('xpath', '//android.view.View[@content-desc="12312"]')
            .waitForElementPresent('xpath', '//android.widget.Button[@content-desc="Маршрут"]')
            .waitForElementPresent('xpath', '//android.view.View[@content-desc="Нулевая точка"]')
            .waitForElementPresent('xpath', '(//android.view.View[@content-desc="Нижнекамск"])[1]')
            .waitForElementPresent('xpath', '(//android.view.View[@content-desc="Координаты"])[1]')
            .waitForElementPresent('xpath', '(//android.view.View[@content-desc="Россия, Республика Татарстан, Нижнекамск, 30-й микрорайон"])[1]')
            .waitForElementPresent('xpath', '(//android.view.View[@content-desc="Средний вес: Не определен"])[1]')
            .waitForElementPresent('xpath', `(//android.view.View[@content-desc="Плановый въезд: ${loadDate}"])[1]`)
            .waitForElementPresent('xpath', `(//android.view.View[@content-desc="Плановый выезд: ${unloadDate}"])[1]`)
            .waitForElementPresent('xpath', '//android.view.View[@content-desc="Точка загрузки"]')
            .waitForElementPresent('xpath', '(//android.view.View[@content-desc="Нижнекамск"])[2]')
            .waitForElementPresent('xpath', '(//android.view.View[@content-desc="Координаты"])[2]')
            .waitForElementPresent('xpath', '(//android.view.View[@content-desc="Россия, Республика Татарстан, Нижнекамск, 30-й микрорайон"])[2]')
            .waitForElementPresent('xpath', '(//android.view.View[@content-desc="Средний вес: Не определен"])[2]')
            .waitForElementPresent('xpath', `(//android.view.View[@content-desc="Плановый въезд: ${loadDate}"])[2]`)
            .waitForElementPresent('xpath', `(//android.view.View[@content-desc="Плановый выезд: ${unloadDate}"])[2]`)

        // app.moveTo(null, 488, 1804)
        //     .mouseButtonDown()
        //     .moveTo(null, 554, 817)
        //     .mouseButtonUp()
        //     .debug()

        await app.perform(function () {
            const actions = this.actions({ async: true });
            return actions

                .move(0, 0)
                .down()
                .pause(200)
                .move(554, 817)
                .pause(200)
                .up()
                .pause(200)

        })

        // await app.perform(function () {
        //     const actions = this.actions({ async: true });
        //     return actions
        //         .dragAndDrop({ x: 520, y: 1828 }, { x: 600, y: 370 })
        // })
        //     .debug()

    },
}




