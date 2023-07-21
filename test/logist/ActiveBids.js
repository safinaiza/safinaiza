var moment = require('moment')
var unirest = require('unirest')
const { GenerateTokenAdmin } = require('../../pageobjects/api/Auth');
const { CancelDriverBids } = require('../../pageobjects/api/Help');
const { CreateBid } = require('../../pageobjects/api/CreateBids');
const { StartBid } = require('../../pageobjects/api/StartBid');

module.exports = {
    // tags: ['Bids'],
    'Создание заявки': async function () {
        await GenerateTokenAdmin()
        await CancelDriverBids(adminToken, 255)
        await CreateBid(255, adminToken)
        await StartBid(createBidId, adminToken)
    },
    'Авторизация водителя': async function (app) {
        await app
            .Code()
            .sendLoginAndPass(app)
            .Push(app)
    },
    'Проверка созданной заявки': async function (app) {
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
            // .waitForElementPresent('xpath', '(//android.view.View[@content-desc="
            .debug()



    },
}


