#!/usr/bin/env node

const meow = require('meow')
const path = require('path')

const self = require('../package.json')
const main = require('..')

const cli = meow(`
Usage
  $ ${Object.keys(self.bin)[0]} <inputFile> [<outputFile>]

Appends a column with a hashed version of a CSV value.
If outputFile is not specified, inputFile is used.

Options
  --help
  --from         Name of the column to hash from [email]
  --to           Name of the column to append [hashedEmail]
  --algorithm    Algorithm to use for hashing [sha512]
  --prefix       Optional salt to prefix values with
  --suffix       Optional salt to suffix values with
  --hmac         HMAC key to generate a HMAC instead of hash

For more information, see:
${self.homepage}
`, {
  description: false,
  flags: {
    from: {
      type: 'string',
      default: 'email',
    },
    to: {
      type: 'string',
      default: 'hashedEmail',
    },
    algorithm: {
      type: 'string',
      default: 'sha512',
    },
    prefix: {
      type: 'string',
      default: '',
    },
    suffix: {
      type: 'string',
      default: '',
    },
    hmac: {
      type: 'string',
      default: '',
    },
    // TODO: deprecated, remove in 2.x
    salt: {
      type: 'string',
      default: '',
    },
  },
})

const input = cli.input[0]
const output = cli.input[1] || input

const fail = (err) => {
  if (err) console.error(`\n${err.stack}`)
  process.exit(1)
}

(async () => {
  if (cli.flags.salt) {
    console.warn('--salt is deprecated. Use --prefix instead.')
    cli.flags.prefix = cli.flags.salt
  }
  if (input) {
    const inputPath = path.resolve(process.cwd(), input)
    const outputPath = path.resolve(process.cwd(), output)

    await main.hashCsv({
      inputPath,
      outputPath,
      fromColumn: cli.flags.from,
      toColumn: cli.flags.to,
      algorithm: cli.flags.algorithm,
      prefix: cli.flags.prefix,
      suffix: cli.flags.suffix,
      hmac: cli.flags.hmac,
    })

    console.log('Done.')
  } else {
    if (process.stdin.isTTY) {
      cli.showHelp(1)
    } else {
      console.error('This CLI utility cannot read streamed inputs.')
    }
  }
})().catch((err) => fail(err))
