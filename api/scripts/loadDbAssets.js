const baseTags = require("../services/db/dummyDb/baseTags.json");
const descriptions = require("../services/db/dummyDB/descriptionCakes");
const { Tag, Cake, Image } = require("../services/db/db");
const { NUMBER } = require("sequelize");
const path = require("path");
const fs = require("fs");
async function loadBaseTags() {
  try {
    await Tag.bulkCreate(baseTags);
    console.log("BASE TAGS LOADED");
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
async function loadBaseCakes() {
  try {
    //$ init
    const allTags = await Tag.findAll();
    let maxTag_id = Number.MIN_SAFE_INTEGER;
    allTags.forEach((tag) => (maxTag_id = Math.max(maxTag_id, tag.tag_id)));
    for (let k = 0; k < 30; k++) {
      //$ create Cake
      const cakeObj = {
        description: descriptions[k],
        public: true,
      };
      const cake = await Cake.create(cakeObj);
      //$ set tags
      const tagCount = Math.floor(Math.random() * 6 + 2);
      const tags = [];
      let rndTag_id = Math.floor(Math.random() * maxTag_id + 1);
      for (let j = 0; j < tagCount; j++) {
        while (tags.includes(rndTag_id))
          rndTag_id = Math.floor(Math.random() * maxTag_id + 1);
        tags.push(rndTag_id);
      }
      await cake.setTags(tags);
    }
    // $set images
    const dbPath = path.join(
      __dirname,
      "..",
      "services",
      "db",
      "dummyDb",
      "images"
    );
    const allCakes = await Cake.findAll();
    const folders = fs.readdirSync(dbPath);
    for (let i = 0; i < folders.length; i++) {
      const folder = folders[i];
      const files = fs.readdirSync(path.join(dbPath, folder));
      for (let j = 0; j < files.length; j++) {
        const fileUrl = files[j];
        const file = fs.readFileSync(path.join(dbPath, folder, fileUrl));
        fs.writeFileSync(path.join(__dirname, "..", "uploads", fileUrl), file);
        await allCakes[i].createImage({
          name: `uploads/${fileUrl}`,
          mainImage: j === 0 ? true : false,
        });
      }
      console.log(`Cake ${i} / 30 loaded`);
    }
    console.log("BASE CAKES LOADED");
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
module.exports = { loadBaseTags, loadBaseCakes };
