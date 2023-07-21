const { appium } = require("nightwatch")

exports.command = async function (app) {
    // console.log(app, appium)
    for (let i = 0; i < 7; i++) {
        appium.pressKeyCode(16)
    }
}
