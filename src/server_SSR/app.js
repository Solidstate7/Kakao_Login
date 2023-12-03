const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const router = require(`./auth/routers/index.route`);
const cookieParser = require("cookie-parser");

app.set("view engine", "html");
nunjucks.configure("src/server_SSR/views", { express: app });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

module.exports = app;
