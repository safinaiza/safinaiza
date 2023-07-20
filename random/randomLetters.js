const generateRandomLetters = (length) => {
    let result = '';
    const characters =
        'АВЕКМНОРСТУХ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

exports.generateRandomLetters = generateRandomLetters;
