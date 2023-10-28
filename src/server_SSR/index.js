const app = require("./app");
const { PORT } = require("./lib/constants");
app.listen(PORT, () => {
    console.log("front server start");
});
