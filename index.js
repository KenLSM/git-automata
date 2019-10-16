const express = require("express");
const https = require("https");
const crypto = require("crypto");

const app = express();

const verifyWebhookSignature = (req, res, next) => {
  console.log("verifyWebhookSignature");
  // console.log(req.headers["x-hub-signature"]);
  const their_signature_header = req.headers["x-hub-signature"] || "sha1=";
  console.log(their_signature_header);
  const [method, their_digest] = their_signature_header.split("=");
  const hmac = crypto.createHmac(method, their_digest);
  hmac.update(req.body);
  const our_digest = hmac.digest("hex");

  if (their_digest !== our_digest) {
    return 401;
  }
  next();
};

app.post("*", verifyWebhookSignature);
app.post("/event_handler", (req, res) => {
  res.body("ok");
});

app.get((req, res) => {
  return res.send("ok");
});

console.log("listening on 5000");
app.listen(5000);
// https.createServer({}, app).listen(5000);
