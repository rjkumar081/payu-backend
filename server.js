const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

/* =========================
   MIDDLEWARE
   ========================= */
app.use(cors({
  origin: "*", // GitHub Pages allow
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/* =========================
   HEALTH CHECK
   ========================= */
app.get("/", (req, res) => {
  res.send("PayU backend running successfully");
});

/* =========================
   PAYU HASH API
   ========================= */
app.post("/hash", (req, res) => {
  const { txnid, amount, productinfo, firstname, email } = req.body;

  if (!txnid || !amount || !productinfo || !firstname || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const PAYU_KEY = process.env.PAYU_KEY;
  const PAYU_SALT = process.env.PAYU_SALT;

  if (!PAYU_KEY || !PAYU_SALT) {
    return res.status(500).json({ error: "PayU ENV variables missing" });
  }

  const hashString =
    PAYU_KEY + "|" +
    txnid + "|" +
    amount + "|" +
    productinfo + "|" +
    firstname + "|" +
    email + "|||||||||||" +
    PAYU_SALT;

  const hash = crypto
    .createHash("sha512")
    .update(hashString)
    .digest("hex");

  res.json({ hash });
});

/* =========================
   START SERVER
   ========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
