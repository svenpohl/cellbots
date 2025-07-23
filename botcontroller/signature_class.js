//
// signature_class.js — Sven Pohl <sven.pohl@zen-systems.de> — MIT License © 2025
// v1.0
// 

const crypto = require('crypto');
const nacl   = require('tweetnacl');
const util   = require('tweetnacl-util');


class signature_class 
{

 
 
 
constructor()
{

this.SIG_NONE      = 0;
this.SIG_HMAC      = 1;
this.SIG_ED25519   = 2;
this.SIG_RSA       = 3;

} // constructor()



//
// create_keypair_or_secret
//
create_keypair_or_secret( sigtype )
{
let keypair = {};
console.log("Create Keypair: " + sigtype);

if ( sigtype == this.SIG_HMAC )
   {
   keypair['PUBLIC_KEY_OR_SECRET']  = this.generateSharedSecret(32);
   keypair['PRIVATE_KEY_OR_SECRET'] =  keypair['PUBLIC_KEY_OR_SECRET'];
   } // SIG_HMAC
 

if (sigtype == this.SIG_ED25519) 
   {
   const keypair_ed25519 = nacl.sign.keyPair();
   
   keypair['PUBLIC_KEY_OR_SECRET']  = util.encodeBase64(keypair_ed25519.publicKey);
   keypair['PRIVATE_KEY_OR_SECRET'] = util.encodeBase64(keypair_ed25519.secretKey);
         
   } // SIG_ED25519


if (sigtype == this.SIG_RSA) 
   {
   const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', 
      {
      modulusLength: 2048,
      publicKeyEncoding: 
            {
            type: 'spki',
            format: 'pem'
            },
      privateKeyEncoding: 
            {
            type: 'pkcs8',
            format: 'pem'
            }
      });

   keypair['PUBLIC_KEY_OR_SECRET']  = publicKey;
   keypair['PRIVATE_KEY_OR_SECRET'] = privateKey;
   } // SIG_RSA


return( keypair );
} // create_keypair_or_secret()




//
// signMessage
//
signMessage(sigtype, message, private_key_or_secret ) 
{


if ( sigtype == this.SIG_HMAC )
   {

   const hmac = crypto.createHmac('sha256', private_key_or_secret);
   hmac.update( message );
   return hmac.digest('hex'); // oder 'base64'
  
   } // SIG_HMAC
 
 
if (sigtype == this.SIG_ED25519) 
   {
   const privateKey = util.decodeBase64(private_key_or_secret);
   const messageBytes = util.decodeUTF8(message);
   const signature = nacl.sign.detached(messageBytes, privateKey);
   return util.encodeBase64(signature);
   } // SIG_ED25519
 

if (sigtype == this.SIG_RSA) 
   {
   
   const signature = crypto.sign('sha256', Buffer.from(message), 
       {
       key: private_key_or_secret,
       padding: crypto.constants.RSA_PKCS1_PSS_PADDING
       });
   return signature.toString('base64');
   } // SIG_RSA


} /// signMessage();



//
// verifyMessage
//
verifyMessage(sigtype, message, receivedSignature, keypair_or_secret) 
{


if ( sigtype == this.SIG_HMAC )
   {
   const expectedSignature = this.signMessage(sigtype, message, keypair_or_secret);
   
   return crypto.timingSafeEqual
      (
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(receivedSignature, 'hex')
     );
  
   } // SIG_HMAC
   
   
if (sigtype == this.SIG_ED25519) 
   {
   
   const publicKey = util.decodeBase64(keypair_or_secret);
   const messageBytes = util.decodeUTF8(message);
   const signatureBytes = util.decodeBase64(receivedSignature);
   return nacl.sign.detached.verify(messageBytes, signatureBytes, publicKey);
   
   } // SIG_ED25519


if (sigtype == this.SIG_RSA) 
   {
   const isValid = crypto.verify(
        'sha256',
         Buffer.from(message),
           {
           key: keypair_or_secret,
           padding: crypto.constants.RSA_PKCS1_PSS_PADDING
           },
         Buffer.from(receivedSignature, 'base64')
         );
   return isValid;
   } // SIG_RSA

 
} /// verifyMessage





// 
// generateSharedSecret() 
// (for SIG_HMAC)
//
generateSharedSecret(length = 32) 
{
return crypto.randomBytes(length).toString('hex');
} // generateSharedSecret()



// For RSA
compressPEM(pem) {
  const body = pem
    .split('\n')
    .filter(line => line && !line.includes('-----')) // Only keep Base64-lines
    .join('|');
    
  return `PEM|${body}`;
}


// For RSA
restorePEM(compact, type = 'PUBLIC KEY') {
  if (compact.startsWith('PEM|')) {
    compact = compact.slice(4); // remove "PEM|"
  }

  const body = compact
    .split('|')
    .filter(line => line.trim() !== '')   
    .join('\n');

  return `-----BEGIN ${type}-----\n${body}\n-----END ${type}-----\n`;
}




} // class signature_class 




// Export class
module.exports = signature_class;


