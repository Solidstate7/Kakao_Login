const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const axios = require("axios");
const cookieParser = require("cookie-parser");
const jwt = require("./lib/jwt");

app.set("view engine", "html");
nunjucks.configure("views", { express: app });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res, next) => {
    try {
        const { token } = req.cookies;
        // console.log(token);
        if (!token) return res.render("index");

        console.log(token);
    } catch (e) {
        next(e);
    }
});

const REST_API_KEY = "a674d5e67f0266bc7d9a50b6c66ce9cd";
const redirectURI = "http://localhost:3000/auth/kakao/callback";

app.get("/auth/kakao/login", (req, res, next) => {
    try {
        const kakaoURI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirectURI}&response_type=code`;
        res.redirect(kakaoURI);
    } catch (e) {}
});

app.get("/auth/kakao/callback", async (req, res, next) => {
    try {
        const { code } = req.query;
        const host = "https://kauth.kakao.com/oauth/token";
        // Content-Type: application/json -> 변경
        const body = `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${redirectURI}&code=${code}`;
        const response = await axios.post(host, body, {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        });
        // console.log(response);
        const {
            data: { access_token },
        } = response;
        // console.log(access_token);
        const userinfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        // const { data } = userinfo;
        // 필요한 항목 뽑아서
        const { data } = userinfo;
        // console.log(properties);
        // 백엔드 요청
        const token = await axios.post(
            `http://localhost:4000/users/token`,
            data
        );

        // console.log(token);

        console.log(token);
        // DB insert
        // 프론트 토큰 받기
        // 쿠키 브라우저에 전달
        // 응답 페이지 이동
        // 쿠키가 있을 때 사용자 닉네임과 프로필
        // res.cookie("token", content);
        // res.redirect("/");
    } catch (e) {}
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

app.listen(3000, () => {
    console.log("front server start");
});
