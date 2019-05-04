const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const loginRoutes = require("./routes/login/loginRoutes")

const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

const mongoose = require("mongoose")

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Creating Sessions
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(loginRoutes)



// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


//Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/twitterAnalysis");

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
