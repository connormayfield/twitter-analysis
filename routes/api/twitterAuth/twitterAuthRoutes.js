const express = require("express");
const router = express.Router();
const passport = require("../../../config/passport");
const request = require("request");

const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

const createToken = function(auth) {
    return jwt.sign({
        id: auth.id
    }, "my-secret",
    {
        expiresIn: 60 * 120
    });
};

const generateToken = function(req, res, next) {
    req.token = createToken(req.auth);
    return next();
};

const sendToken = function(req, res) {
    res.setHeader("x-auth-token", req.token);
    return res.status(200).send(JSON.stringify(req.user));
};

router.route("/reverse")
    .post(function(req, res) {
        request.post({
            url: "https://api.twitter.com/oauth/request_token",
            oauth: {
                oauth_callback: process.env.CALLBACK || "http%3A%2F%2Flocalhost%3A3000%2F",
                consumer_key: "PUKeIFz9XrfpLMaePxdSBCOpo",
                consumer_secret: "u6YVPzov7A2RKOd37PGIASbQAG09aHUrolU93YXhqL9aBZuyXJ"
            }
        }, function(err, r, body) {
            if (err) {
                res.status(500).send({ message: e.message });
            }

            const jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            res.send(JSON.parse(jsonStr));
        });
    });

router.route("/")
    .post(function(req, res, next) {
        request.post({
            url: "https://api.twitter.com/oauth/access_token?oauth_verifier",
            oauth: {
                consumer_key: "PUKeIFz9XrfpLMaePxdSBCOpo",
                consumer_secret: "u6YVPzov7A2RKOd37PGIASbQAG09aHUrolU93YXhqL9aBZuyXJ",
                token: req.query.oauth_token
            },
            form: { oauth_verifier: req.query.oauth_verifier }
        }, function(err, r, body) {
            if (err) return res.status(500).send({ message: e.message });

            const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            const parsedBody = JSON.parse(bodyString);

            req.body["oauth_token"] = parsedBody.oauth_token;
            req.body["oauth_token_secret"] = parsedBody.oauth_token_secret;
            req.body["user_id"] = parsedBody.user_id;

            next();
        });
    }, passport.authorize("twitter-token", {session: false}), function(req, res, next) {

        if (!req.user) {
            return res.status(401).send("User Not Authorized");
        }

        // prepare token for API
        req.auth = {
            id: req.user.id
        };

        return next();
    }, generateToken, sendToken);

router.route("/callback")
    .get(function(req, res) {
        const callback = process.env.PROD_CALLBACK || "http://localhost:3000/";
        res.redirect(callback + "home?" + req.url.split("?")[1]);
    })

module.exports = router;