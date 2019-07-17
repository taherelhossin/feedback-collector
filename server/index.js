const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const keys = require("./config/keys");

const app = express();
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.faceBookClientID,
      clientSecret: keys.faceBookClientSecret,
      callbackURL: "/auth/facebook/callback"
    },
    (accToken, ref, profile) => console.log("profile: " + JSON.stringify(profile, "\t"))
  )
);

app.get("/welcome", (req, res) => {
  res.send({ welcome: "anas" });
});

app.get(
  "/auth/facebook/login",
  passport.authenticate("facebook", { scope: "email" })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook",{}, (req, res) => {
    console.log(req);
    res.redirect("/welcome");
  })
);

const PORT = process.env.PORT || 6661;
console.log(`Start listen to port ${PORT}`);
app.listen(PORT);
