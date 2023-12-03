const frontApp = require("./src/server_SSR/app");
const { PORT } = require("./src/server_SSR/lib/constants");
frontApp.listen(PORT, () => {
    console.log("front server start");
});

const backApp = require("./src/server_backend/app");
const {
    ORM: { sequelize },
} = require("./src/server_backend/lib/index");

backApp.listen(4000, async () => {
    await sequelize.sync({ force: true });
    console.log(`DB Connection`);
    console.log("Server Start");
});
