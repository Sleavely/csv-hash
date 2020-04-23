const csv = require('./utils/csv')
const crypto = require('./utils/crypto')

const hashCsv = async ({ inputPath, outputPath, fromColumn, toColumn, algorithm = 'sha512', salt = '' }) => {
  const records = await csv.read(inputPath)
  let hashedRecords = 0
  records.forEach((record) => {
    if (record[fromColumn]) {
      hashedRecords++
      record[toColumn] = crypto.hash(`${salt}${record[fromColumn]}`, algorithm)
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
