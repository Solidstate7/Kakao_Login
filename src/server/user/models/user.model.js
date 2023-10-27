module.exports = (sequelize, DataTypes) => {
    sequelize.define(
        "KakaoUser",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            pfp_link: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            pfpthumb_link: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
        }
    );
};
