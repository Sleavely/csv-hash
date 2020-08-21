const csv = require('./utils/csv')
const crypto = require('./utils/crypto')

const hashCsv = async ({ inputPath, outputPath, fromColumn, toColumn, algorithm = 'sha512', prefix = '', suffix = '', hmac = '' }) => {
  const records = await csv.read(inputPath)
  let hashedRecords = 0
  records.forEach((record) => {
    if (record[fromColumn]) {
      hashedRecords++
      const value = `${prefix}${record[fromColumn]}${suffix}`
      if (!hmac) {
        record[toColumn] = crypto.hash(value, algorithm)
      } else {
        record[toColumn] = crypto.hmac(value, algorithm, hmac)
      }
    }
  })
  console.log(`Hashed ${hashedRecords} records.`)

  return csv.write(outputPath, records)
}

module.exports = exports = {
  csv,
  crypto,
  hashCsv,
}
