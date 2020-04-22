const fs = require('fs')
const { promisify } = require('util')

exports.readFileAsync = promisify(fs.readFile)
exports.writeFileAsync = promisify(fs.writeFile)
