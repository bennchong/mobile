
const cryptoHelper = require('./Crypto.tsx');

cryptoHelper.generateEncryptionKey(2048).then( (val) => {console.log(val)})
