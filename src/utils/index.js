module.exports.generatePassword = function() {
    let length = 10,
        charset = 'abcd1efgh2jkl3mnop4qrst5uvw6xy7zABC8DEFGHJK9LMNPQRSTUVWXYZ',
        retVal = ''
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n))
    }
    retVal += Math.floor(Math.random() * 9 + 1)

    return retVal
}
