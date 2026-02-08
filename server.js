const express = require("express");
const crypto = require("crypto");
const app = express();

app.use(express.json());

const PAYU_KEY = "vB7clP";
const PAYU_SALT = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD0D/6hlx91ZT0x6O+vJKmDpteDMFq//HCXm/HH5nuSxJ1M9uKNyJdk4qL0dTfa+b+ocq7Z/tPATZp8Vny8mSqfRj3Ojkl0Q9sOq+yGHkCkD8k9dHSypjzUa51enmNpm2HC7Dh/IuU813KJBcls2X7yKinMWbvrQ4TtOAk7hxiSu99X+14HQTs39XpraEsP6NHq5RN5+eh/3OjUydJgZBMJ2lgoHBIFBHZwRYvKcq3m29Fa7JyC5HpRP5TbQ3B954hldZkWZeQCseX8u/+VCsKyog4SjZD27tqpAroEOAsjBswsIgtls0fyYIIWQAR69g0LWVrOBjloIxxT2nv/n3jVAgMBAAECggEACQzjyh22xK1vpr9mzfWb1J41/S8omlhz22dkwJ8vI2rnk2BPV+chmBPga5TCMLxUq1wvWDWfKBEooqY5Y2wBnNzns1Zq6mUOxT1CXNnX102fjogYQLyx4kWoVQcmFBc3OZl1Yd+LJSWvIV4l0UPCdZvzJ1kHgyqijgJnMz4n/t7ml3/eHLFfuG6DE+z++zUrmi5SyL5RI73MdncUVE6WUgK6yV9p4DM3WWrvdhjl4xY9ekKzAbD7ARxnEYrVE9leHMGqXuwBJzDBQKYfteYMigByLMCuezyEXEJzdtr3GSSjRgfpo+8yjwPzpCPK/42e6RNW65S3qNWrxbjKrPSxgQKBgQD+fY7CUOAOx+ZN2kJobPJMeLGCJWXlb6o+QqM/yZC6RsRzMWV/KrVTpWVqWbwulY21F0nhcRUzAsp/cwCIe0NvlzOCsICyO49SRPTj9039KW4UylexPDEaSidW7d3OP0ZcK7Avt1V+Dh9wonR2Xm1Pgb9oKR8J9qtKv60yiqTngQKBgQD1gpon1UxMnOjALgQpCMHRs2oBWfCXRN+3eTUNUi4A+mIaJixytmD8VGRRQr9Ld1GvZXUJxPCfwVbb2Ge1ql9rgpG12H2qKOY5S2WhqFlqzrO0eYzwMoMDyN/Jp7pJGPnG6jmWzjjeOddKls0KqiZbjTWPbFkOyF08UyZRrHQbVQKBgQDbHGuPrmZbE42ctjC7DCJJ6RicP2rN8iiX1nQL9ZXgbBG0RHFo3fKlBCCfQoedbDJIGrcHnX9tHhgPR4rL96UGLR6yhRkpW9J4ONrIdCL3t3YJ/HUoKfT096eLVt3EOAJyVUMqsiSvlaVIKvcu+voOnF2aZt1MjM7KWuHaRDjbAQKBgCrkqH4xG+V+vINnBr8MkqBKkkiuKASludhaStSK+RKerCkZZkacapFrRSOVX8qVjCXyueH9EHU42C4MvwHURFuKMl7s9feWsbJs49K8kPLCLk9ntSH6ET3GCKM4tKk0vd7s6SbZ3MGmpWCYvDYSyCTSpPrr2RtmEjQJ6vX2BUsJAoGBAIg0IkLHHOujWTM4ypcke6Qqx9UXEzzPEYFjjeAx7388qDDorl56ciZn4B+p/nGtZWpABADXwUgnadWLfFq+Bdb+z4WCA/edioep3OcmQoAIeiVzRt3FjL/OryZOfTqgAF9bC30wh6o7TqnxjSseyxliMaMRovTvNOiDOXvl5kvg";

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
