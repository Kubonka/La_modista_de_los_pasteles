const { Model } = require("sequelize");
const { Cake, Image } = require("../../services/db/db");

async function getCarrousel(carrousel_id) {
  try {
    // switch (carrousel_id) {
    //   case 1:
    //     break;
    //     default:
    //       break;
    //     }
    //TODO aca va un switch donde depende del carrousel_id hace diferente logica y entrega tortas
    const maxItems = 15;
    const results = [];
    for (let i = 0; i < maxItems; i++) {
      const rndCake_id = Math.floor(Math.random() * 30 + 1);
      const cakeFound = await Cake.findByPk(rndCake_id, {
        include: { model: Image },
      });
      console.log("-> ", cakeFound.cake_id);
      //console.log(cakeFound);
      results.push({
        cake_id: rndCake_id,
        image: cakeFound.Images.filter((image) => image.mainImage)[0].name,
      });
    }
    return { carrousel_id, carrousel: results };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

module.exports = { getCarrousel };
