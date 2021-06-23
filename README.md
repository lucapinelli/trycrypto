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
openssl genrsa -out ./openssl/anna/privkey.pem 2048
openssl rsa -in ./openssl/anna/privkey.pem -pubout -out ./openssl/anna/pubkey.pem

openssl genrsa -out ./openssl/luca/privkey.pem 2048
openssl rsa -in ./openssl/luca/privkey.pem -pubout -out ./openssl/luca/pubkey.pem
```
