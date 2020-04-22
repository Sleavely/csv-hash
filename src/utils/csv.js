const fs = require('./fs')
const parse = require('csv-parse/lib/sync')
const stringify = require('csv-stringify/lib/sync')

exports.read = async (path) => {
  const csvString = await fs.readFileAsync(path)
  const records = parse(csvString, {
    columns: true,
    skip_empty_lines: true,
  })
  return records
}

/**
 * @param {object[]} records Array of objects where the property keys are column names
 */
exports.write = async (path, records) => {
  // Figure out all possible columns,
  // otherwise only the ones from the first record will be used.
  const columns = Array.from(records.reduce((set, record) => {
    Object.keys(record).forEach(column => set.add(column))
    return set
  }, new Set()))

  const csvString = stringify(records, {
    header: true,
    columns,
  })

  return fs.writeFileAsync(path, csvString)
}
