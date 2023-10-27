const Sequelize = require("sequelize");
const { db } = require("./db");

const { database, username, password } = db;

const sequelize = new Sequelize(database, username, password, db);

require("../user/models/user.model")(sequelize, Sequelize.DataTypes);

const { KakaoUser } = sequelize.models;

module.exports = {
    sequelize,
    KakaoUser,
};
