const server = require("./app.js");
const { db } = require("./services/db/db.js");
const loadDbAssets = require("./scripts/loadDbAssets.js");
//!1

db.sync({ force: true }).then(async () => {
  await loadDbAssets.loadBaseTags();
  await loadDbAssets.loadBaseCakes();
  server.listen(process.env.PORT, () => {
    console.log("LISTENING AT 3001");
  });
});
