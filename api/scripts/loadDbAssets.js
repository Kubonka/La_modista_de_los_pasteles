const baseTags = require("../services/db/baseTags.json");
const descriptions = require("../services/db/dummyDB/descriptionCakes");
const { Tag, Cake, Image } = require("../services/db/db");
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
    //armar 50 tortas con los controllers
    //CREO LA CAKE Y ME QUEDO CON EL ID
    //LE AGREGO TAGS A ESA TORTA
    //LE AGREGO IMAGENES A ESA TORTA

    for (let i = 0; i < 50; i++) {
      const cakeObj = {
        name: `Torta ${i + 1}`,
        description: descriptions[i],
        public: true,
      };
      const cake = await Cake.create(cakeObj);
      const tagCount = Math.floor(Math.random() * 6 + 2);
      const tags = [];
      for (let j = 0; j < tagCount; j++) {
        tags.push(j + 1);
      }
      await cake.setTags(tags);
      await cake.createImage({
        name: "uploads/testImage.png",
        mainImage: true,
      });

      for (let k = 0; k < 4; k++) {
        await cake.createImage({
          name: "uploads/testImage.png",
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
