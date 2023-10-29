// env constants
require("dotenv").config();
const {
    DB_DATABASE,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DIALECT,
    SALT,
} = process.env;
// DB object
const DB = {
    database: DB_DATABASE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dialect: DB_DIALECT,
};
// sequelize setup
const Sequelize = require("sequelize");
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB);
// specify the model
require("../user/models/user.model")(sequelize, Sequelize.DataTypes);
const { KakaoUser } = sequelize.models;
// jwt instance
const jwt = require("./classes/jwt");
// DTO classes
const BaseDTO = require("./classes/dto");
// Exception classes
const HttpException = require("./classes/exception");

module.exports = {
    ORM: {
        sequelize,
        KakaoUser,
    },
    JWT: {
        SALT,
        jwt,
    },
    DTO: {
        BaseDTO,
    },
    EXCEPTION: {
        HttpException,
    },
};
