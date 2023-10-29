const app = require("./app");
const {
    ORM: { sequelize },
} = require("./lib/index");
app.listen(4000, async () => {
    await sequelize.sync({ force: true });
    console.log(`DB Connection`);
    console.log("Server Start");
});
