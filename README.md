# trycrypto

Use the native Node.js `crypto` module to send an encrypted signed message.

## Run

```sh
npm run start
```

Tested using Node.js v12.16.3 and Node.js v14.16.0.

## OpenSSL Certificates

To generate the certificates you can execute:

```sh
openssl genrsa -out ./openssl/master/privkey.pem 2048
openssl rsa -in ./openssl/master/privkey.pem -pubout -out ./openssl/master/pubkey.pem

openssl genrsa -out ./openssl/client/privkey.pem 2048
openssl rsa -in ./openssl/client/privkey.pem -pubout -out ./openssl/client/pubkey.pem
```
