const baseTags = require("../services/db/baseTags.json");
const descriptions = require("../services/db/dummyDB/descriptionCakes");
const { Tag, Cake, Image } = require("../services/db/db");
const { NUMBER } = require("sequelize");
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
    const allTags = await Tag.findAll();
    let maxTag_id = Number.MIN_SAFE_INTEGER;
    allTags.forEach((tag) => (maxTag_id = Math.max(maxTag_id, tag.tag_id)));
    for (let i = 0; i < 50; i++) {
      const cakeObj = {
        name: `Torta ${i + 1}`,
        description: descriptions[i],
        public: true,
      };
      const cake = await Cake.create(cakeObj);
      const tagCount = Math.floor(Math.random() * 6 + 2);
      const tags = [];
      let rndTag_id = Math.floor(Math.random() * maxTag_id + 1);
      for (let j = 0; j < tagCount; j++) {
        while (tags.includes(rndTag_id))
          rndTag_id = Math.floor(Math.random() * maxTag_id + 1);
        tags.push(rndTag_id);
      }
      await cake.setTags(tags);
      await cake.createImage({
        name: `uploads/testImage${Math.floor(
          Math.random() * 20
        ).toString()}.png`,
        mainImage: true,
      });

      for (let k = 0; k < 4; k++) {
        await cake.createImage({
          name: `uploads/testImage${Math.floor(
            Math.random() * 20
          ).toString()}.png`,
          mainImage: false,
        });
      }
    }
    console.log("BASE CAKES LOADED");
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
module.exports = { loadBaseTags, loadBaseCakes };
