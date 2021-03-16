const crypto = require('crypto')
const fs = require('fs')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)

const main = async () => {
  const lucaPrivKey = await readFile('./openssl/luca/privkey.pem', 'utf8')
  const lucaPubKey = await readFile('./openssl/luca/pubkey.pem', 'utf8')

  const annaPrivKey = await readFile('./openssl/anna/privkey.pem', 'utf8')
  const annaPubKey = await readFile('./openssl/anna/pubkey.pem', 'utf8')

  const encrypt = (message, pubKey) =>
    crypto
      .publicEncrypt(pubKey, Buffer.from(message))
      .toString('base64')

  const decrypt = (message, privKey) =>
    crypto
      .privateDecrypt(privKey, Buffer.from(message, 'base64'))
      .toString('utf8')

  const digest = (message) => {
    const hasher = crypto.createHash('sha256')
    hasher.update(message)
    // hasher.update('another chunk...')
    return hasher.digest('hex')
  }

  const sign = (message, privKey) => {
    const signer = crypto.createSign('sha256')
    signer.update(message)
    const signature = signer.sign(privKey, 'base64')
    return signature
  }

  const verifySignature = (message, signature, pubKey) => {
    const verifier = crypto.createVerify('sha256')
    verifier.update(message)
    return verifier.verify(pubKey, signature, 'base64')
  }

  console.log(' * SCOPE: Anna sends a signed encripted message to Luca.')

  const msg = '\n\tListen for silence in noisy places;\n\tfeel at peace in the midst of disturbance;\n\tawaken joy when there is no reason.\n\t                 "Sivaya Subramuniyaswami"'
  console.log(' * msg: ', msg)

  console.log(' * Anna encrypts the message with the Luca\'s public key and sign the message digest with the her private key.')
  const encrypted = encrypt(msg, lucaPubKey)
  const signature = sign(digest(msg), annaPrivKey)
  console.log('   * encrypted: ', encrypted)
  console.log('   * signature: ', signature)

  console.log(' * Luca decrypts the message with the his private key and verifies the message digest with Anna\'s public key.')
  const decrypted = decrypt(encrypted, lucaPrivKey)
  console.log('   * decrypted: ', decrypted)
  if (!verifySignature(digest(decrypted), signature, annaPubKey)) {
    throw new Error('ERROR: invalid signature')
  } else {
    console.log('   * the signature is valid')
  }
}

console.log(' * Node.js version:', process.version)
const startedAt = Date.now()
main()
  .then(() => {
    console.log(' * program terminated (elapsed', Date.now() - startedAt, 'ms).\n')
  })
  .catch(e => {
    console.log('ERROR:', e)
    process.exit(2021)
  })
