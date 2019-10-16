const express = require('express');
const https = require('https'); const crypto = require('crypto');

const app = express();

https.createServer({}, app).listen(5000);

app.post('/event_handler', (req, res) => {

});

const verifyWebhookSignature = (req, res, next) => {
  const their_signature_header = req.env['HTTP_X_HUB_SIGNATURE'] || 'sha1='
  const [method, their_digest] = their_signature_header.split('=')
  const hmac = crypto.createHmac(method, their_digest);
  hmac.update(req.body);
  const our_digest = hmac.digest('hex');

  if (their_digest !== our_digest) {
    return 401
  }
  next()
}
