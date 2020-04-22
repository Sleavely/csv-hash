const crypto = require('crypto')

/**
 * Creates a sha512 hash from the input.
 */
exports.hash = (input, algorithm = 'sha512') => {
  return crypto.createHash(algorithm).update(input).digest('hex')
}
