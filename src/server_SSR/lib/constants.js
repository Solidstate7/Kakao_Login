require("dotenv").config();

const {
    PROTOCOL,
    HOSTNAME,
    PORT,
    REST_API_KEY,
    REDIRECT_URI,
    ACCESS_TOKEN_URI,
    USERINFO_URI,
    SALT,
} = process.env;

const REDIRECTION = `${PROTOCOL}://${HOSTNAME}:${PORT}${REDIRECT_URI}`;

module.exports = {
    PROTOCOL,
    HOSTNAME,
    PORT,
    REST_API_KEY,
    REDIRECT_URI,
    ACCESS_TOKEN_URI,
    USERINFO_URI,
    REDIRECTION,
    SALT,
};
