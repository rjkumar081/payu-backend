const express = require("express");
const crypto = require("crypto");
const app = express();

app.use(express.json());

const PAYU_KEY = "YOUR_PAYU_KEY";
const PAYU_SALT = "YOUR_PAYU_SALT";

app.post("/hash", (req, res) => {
  const { txnid, amount, productinfo, firstname, email } = req.body;

  const hashString =
    PAYU_KEY + "|" +
    txnid + "|" +
    amount + "|" +
    productinfo + "|" +
    firstname + "|" +
    email + "|||||||||||" +
    PAYU_SALT;

  const hash = crypto.createHash("sha512").update(hashString).digest("hex");
  res.json({ hash });
});

app.listen(3000, () => console.log("Server running"));
