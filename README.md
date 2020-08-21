# csv-hash

> Hashes values in a CSV

[Github](https://github.com/Sleavely/csv-hash) | [NPM](https://www.npmjs.com/package/csv-hash)

## Install

```
$ npm i -g csv-hash
```

Node 10+ is recommended.

## Usage

```
$ csv-hash --help

  Usage
    $ csv-hash <inputFile> [<outputFile>]

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
  https://github.com/Sleavely/csv-hash
```
