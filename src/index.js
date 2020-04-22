const csv = require('./utils/csv')
const crypto = require('./utils/crypto')

const hashCsv = async ({ inputPath, outputPath, fromColumn, toColumn, algorithm }) => {
  const records = await csv.read(inputPath)
  records.forEach((record) => {
    if (record[fromColumn]) {
      console.log(`Hashing ${record[fromColumn]}`)
      record[toColumn] = crypto.hash(record[fromColumn], algorithm)
    }
  })

  return csv.write(outputPath, records)
}

module.exports = exports = {
  csv,
  crypto,
  hashCsv,
}
