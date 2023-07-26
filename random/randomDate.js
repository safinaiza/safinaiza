
var moment = require('moment')

//(`~Плановый въезд: ${loadDate}`)
//     (`~Плановый въезд: ${unloadDate}`)

//     (`~Плановый въезд: ${loadDateSecondBid}`)
//     (`~Плановый въезд: ${unloadDateSecondBid}`)


//точка А
// const loadDate = moment().format('DD.MM.YYYY HH:mm') //въезд - текущий день, время
// console.log(loadDate)

// const unloadDate = moment().add(1, 'h').format('DD.MM.YYYY HH:mm') // выезд  - текущий день, время + 1 час
// console.log(unloadDate)

/// точка В
// const loadDateSecondBid = moment().add(1, 'd').format('DD.MM.YYYY HH:mm') //въезд - текущий день, время + 1 день
// console.log(loadDateSecondBid)

// const unloadDateSecondBid = moment().add(1, 'd').add(1, 'h').format('DD.MM.YYYY HH:mm') //выезд  - текущий день, время + 1 день, + 1 час
// console.log(unloadDateSecondBid)