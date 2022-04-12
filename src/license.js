const crypto = require('crypto')
const fs = require('fs')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)

const main = async () => {
  const privKey = await readFile('./openssl/luca/privkey.pem', 'utf8')
  console.log('$$$ privKey', privKey)
  const pubKey = await readFile('./openssl/luca/pubkey.pem', 'utf8')
  console.log('$$$ pubKey', pubKey)

  const license = {
    expiryDate: '2022-06-30T23:59:59.999Z',
    profile: 'enterprise'
  }

  const encrypted = crypto
    .privateEncrypt(privKey, Buffer.from(JSON.stringify(license)))
    .toString('base64')

  console.log('$$$ encrypted', encrypted)

  const decrypted = JSON.parse(crypto
    .publicDecrypt(pubKey, Buffer.from(encrypted, 'base64'))
    .toString('utf8'))

  console.log('$$$ decrypted', decrypted)
}

main()
  .then(() => {
    console.log('program terminated.')
  })
  .catch(e => {
    console.log('ERROR:', e)
    process.exit(2021)
  })
