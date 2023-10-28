const {
    ACCESS_TOKEN_URI,
    USERINFO_URI,
    REST_API_KEY,
    REDIRECTION,
    SALT,
} = require("../../lib/constants");

const jwt = require("../../lib/jwt");
const axios = require("axios");

exports.renderMainPage = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) return res.render("index");

        const verified = jwt.verify(token, SALT);
        const { id, nickname, pfp_link, pfpthumb_link } = verified;
        res.render("index", { id, nickname, pfp_link, pfpthumb_link });
    } catch (e) {
        next(e);
    }
};

exports.loginKakao = (req, res, next) => {
    try {
        const kakaoURI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECTION}&response_type=code`;
        res.redirect(kakaoURI);
    } catch (e) {
        next(e);
    }
};

exports.callbackKakao = async (req, res, next) => {
    try {
        const { code } = req.query;

        const body = `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECTION}&code=${code}`;
        const contentType = {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        };
        const response = await axios.post(ACCESS_TOKEN_URI, body, contentType);

        const {
            data: { access_token },
        } = response;
        const bearer = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        const userinfo = await axios.get(USERINFO_URI, bearer);

        const { data } = userinfo;

        const token = await axios.post(
            `http://localhost:4000/users/token`,
            data
        );

        const { data: content } = token;
        if (!content) return res.redirect("/");

        res.cookie("token", content);
        res.redirect("/");
    } catch (e) {
        next(e);
    }
};
