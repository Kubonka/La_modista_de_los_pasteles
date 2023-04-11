const { Image } = require("../../services/db/db");

async function setMainImage(image_id, cake_id) {
  try {
    //TODO SETEAR IMAGEN
    const images = await Image.findAll({ where: { cake_id } });
    images.forEach(async (image) => {
      if (image.mainImage) {
        image.mainImage = false;
        await image.save();
      }
    });
    const image = await Image.update(
      { mainImage: true },
      { where: { image_id } }
    );
    return "SUCCESS";
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteImage(image_id) {
  try {
    const image = await Image.destroy({ where: { image_id } });
    if (image) return "SUCCESS";
    else return "FAIL";
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { setMainImage, deleteImage };
