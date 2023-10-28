const app = require("./app");
const { sequelize } = require("./lib/sequelize");
app.listen(4000, async () => {
    await sequelize.sync({ force: true });
    console.log(`DB Connection`);
    console.log("Server Start");
});
