const crypto = require('crypto')

/**
 * Creates a sha512 hash from the input.
 */
exports.hash = (input, algorithm = 'sha512') => {
  return crypto.createHash(algorithm).update(input).digest('hex')
}

exports.hmac = (input, algorithm = 'sha512', key = '') => {
  return crypto.createHmac(algorithm, key).update(input).digest('hex')
}
