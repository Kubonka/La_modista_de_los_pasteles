const server = require("./app.js");
const { db } = require("./services/db/db.js");

//!1

db.sync({ force: true }).then(async () => {
  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3001");
  });
});
