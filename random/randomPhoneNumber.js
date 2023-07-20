const generatePhoneNumber = function() {
    return (Math.floor(Math.random() * 900000000) + 100000000)
}

exports.generatePhoneNumber = generatePhoneNumber;