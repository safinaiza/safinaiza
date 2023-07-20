
var moment = require('moment')
var unirest = require('unirest')
const { GenerateTokenAdmin } = require('../../pageobjects/api/Auth');
const { CancelDriverBids } = require('../../pageobjects/api/Help');
const { CreateBid } = require('../../pageobjects/api/CreateBids');
const { StartBid } = require('../../pageobjects/api/StartBid');

GenerateTokenAdmin()
    .then(() => {
        CancelDriverBids(adminToken, 255)
            .then(() => {
                CreateBid(255, adminToken)
                    .then(() => {
                        StartBid(createBidId, adminToken)
                    })
            })
    })
