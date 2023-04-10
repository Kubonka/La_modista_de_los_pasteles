const baseTags = require("../services/db/baseTags.json");
const { Tag } = require("../services/db/db");
async function loadBaseTags() {
  try {
    await Tag.bulkCreate(baseTags);
    console.log("BASE TAGS LOADED");
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
module.exports = { loadBaseTags };
