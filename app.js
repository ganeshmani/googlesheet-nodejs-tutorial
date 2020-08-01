const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const fetch = require("node-fetch");
const GOOGLE_SHEET_URL = "URL";
// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("dashboard");
});

app.post("/save", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const fromdate = req.body.fromdate;
  const todate = req.body.todate;

  const url = `${GOOGLE_SHEET_URL}?Name=${encodeURIComponent(
    username
  )}&Email=${encodeURIComponent(email)}&Phone=${encodeURIComponent(
    phone
  )}&FromDate=${encodeURIComponent(fromdate)}&ToDate=${encodeURIComponent(
    todate
  )}`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((res) => console.log("google sheet res", { res }))
    .catch((error) => console.error(error));

  res.render("success");
});

app.listen(3005, () => {
  console.log("Server is running on PORT 3005");
});
